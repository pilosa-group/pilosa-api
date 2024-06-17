import { Injectable } from '@nestjs/common';
import type { Request, Response } from 'playwright';
import { chromium } from 'playwright';
import { co2 } from '@tgwf/co2';
import { calculateTotalSize } from './utils/calculateTotalSize';
import { isCdn } from './utils/isCdn';
import { isCacheable } from './utils/isCacheable';
import { findRequestByContentType } from './utils/findRequestByContentType';
import { BrowserMetricPath } from '@app/web-metrics/entities/browser-metric-path.entity';
import { findRequestByDomain } from '@app/synthetic-scan/utils/findRequestByDomain';
import {
  assetGroupKeys,
  assetGroups,
  BrowserMetricAssetGroup,
} from '@app/web-metrics/entities/browser-metric-asset-group.entity';
import { GreenHostingService } from '@app/synthetic-scan/green-hosting.service';
import { BrowserMetricDomainService } from '@app/web-metrics/browser-metric-domain.service';
import { BrowserMetricPathService } from '@app/web-metrics/browser-metric-path.service';
import { BrowserMetricPathStats } from '@app/web-metrics/entities/browser-metric-path-stats.entity';
import { isCompressed } from '@app/synthetic-scan/utils/isCompressed';
import { formatBytes } from '@app/synthetic-scan/utils/formatBytes';

export type NetworkRequest = {
  url: string;
  request: Request;
  response?: Response;
};

export type FileTypeResult = {
  count: number;
  totalBytes: number;
  totalBytesFormatted: string;
  estimatedCo2: number;
};

type Hosting = {
  domain: string;
  green: boolean;
};

export type DomainResult = {
  domain: string | null;
  requests: NetworkRequest[];
  hosting: Hosting[];
  time?: {
    domReady: number;
    load: number;
    networkIdle: number;
  };
  totalBytes: number;
  totalBytesFormatted: string;
  estimatedCo2: number;
  cdnPercentage: number;
  compressedPercentage: number;
  cachePercentage: number;
  fileTypes: {
    images?: FileTypeResult;
    scripts?: FileTypeResult;
    stylesheets?: FileTypeResult;
    json?: FileTypeResult;
    fonts?: FileTypeResult;
    video?: FileTypeResult;
    audio?: FileTypeResult;
    other?: FileTypeResult;
  };
};

export type VisitResult = {
  total?: DomainResult;
  domains?: DomainResult[];
};

export type Result = {
  firstVisit?: VisitResult;
  secondVisit?: VisitResult;
};

const ignoreDomains = ['localhost'];

const logger = console.log;

const scrollPageToEnd = async (page) => {
  const scrollStep = 250; // Scroll down by 250 pixels

  while (true) {
    await page.evaluate((scrollStep) => {
      window.scrollBy(0, scrollStep);
    }, scrollStep);

    await page.waitForTimeout(50);

    const totalScroll = await page.evaluate(() => {
      return Math.ceil(document.body.scrollHeight - window.innerHeight);
    });

    const currentScroll = await page.evaluate(() => {
      return Math.ceil(window.scrollY);
    });

    if (currentScroll >= totalScroll) {
      break;
    }
  }
};

const co2Emission = new co2({});

async function toFileTypeResult(
  networkRequests: NetworkRequest[],
  greenHost: boolean,
): Promise<FileTypeResult> {
  const totalBytes = await calculateTotalSize(networkRequests);

  return {
    count: networkRequests.length,
    totalBytes,
    totalBytesFormatted: formatBytes(totalBytes),
    estimatedCo2: co2Emission.perByte(totalBytes, greenHost),
  };
}

@Injectable()
export class SyntheticScanService {
  constructor(
    private greenHostingService: GreenHostingService,
    private browserMetricsDomainService: BrowserMetricDomainService,
    private browserMetricsPathService: BrowserMetricPathService,
  ) {}

  async run(url: string): Promise<any> {
    const urlObject = new URL(url);

    const topDomain =
      await this.browserMetricsDomainService.findOrCreateOneByDomain(
        urlObject.hostname,
      );

    let path: BrowserMetricPath = undefined;

    if (topDomain) {
      path = await this.browserMetricsPathService.findOneByDomainPath(
        topDomain,
        urlObject.pathname,
      );

      if (path) {
        // await path.stats.loadItems();
        // console.log(wrap(path).toJSON());
        // return wrap(path).serialize();
      }
    }

    const browser = await chromium.launch({
      // headless: false,
    });
    const page = await browser.newPage({
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    });

    let domReadyTime: number;
    let loadTime: number;

    let networkRequests: NetworkRequest[] = [];

    async function handleRequest(request: Request) {
      networkRequests.push({
        url: request.url(),
        request,
        response: await request.response(),
      });
    }

    const handleDomContentLoaded = () => {
      domReadyTime = (Date.now() - startTime) / 1000;
    };

    const handleLoad = () => {
      loadTime = (Date.now() - startTime) / 1000;
    };

    page.on('requestfinished', handleRequest);
    page.on('domcontentloaded', handleDomContentLoaded);
    page.on('load', handleLoad);

    const startTime = Date.now();

    logger(`Visiting ${url}`);

    await page.goto(url);

    await page.waitForLoadState('load');

    const networkIdleTime = (Date.now() - startTime) / 1000;

    await scrollPageToEnd(page);

    // unique network requests (based on url)
    networkRequests = Array.from(
      new Map(
        networkRequests.map((request) => [request.url, request]),
      ).values(),
    );

    topDomain.isGreenHost = await this.greenHostingService.isGreenHost(
      urlObject.hostname,
    );

    await this.browserMetricsDomainService.save(topDomain);

    if (!path) {
      path = new BrowserMetricPath(topDomain, urlObject.pathname);
      path.domain = topDomain;

      topDomain.paths.add(path);
    }

    path.title = await page.title();

    const pathStats = new BrowserMetricPathStats();

    pathStats.domReadyTime = domReadyTime;
    pathStats.loadTime = loadTime;
    pathStats.networkIdleTime = networkIdleTime;

    path.stats.add(pathStats);

    const domains = Array.from(
      new Set(
        networkRequests
          .map((request) => new URL(request.url).hostname)
          .filter((hostname) => !ignoreDomains.includes(hostname)),
      ),
    );

    for (const assetGroupName of assetGroupKeys) {
      const matchContentTypes = assetGroups[assetGroupName];

      for (const domain of domains) {
        const domainRequests = networkRequests.filter(
          findRequestByDomain(domain),
        );

        const subDomain =
          await this.browserMetricsDomainService.findOrCreateOneByDomain(
            domain,
          );

        subDomain.isGreenHost =
          await this.greenHostingService.isGreenHost(domain);

        await this.browserMetricsDomainService.save(subDomain);

        const matchingAssetRequests = domainRequests.filter(
          findRequestByContentType(matchContentTypes),
        );

        if (matchingAssetRequests.length > 0) {
          const assetGroup = new BrowserMetricAssetGroup();
          assetGroup.domain = subDomain;
          assetGroup.numberOfRequests = matchingAssetRequests.length;
          const totalBytesTransferred = await calculateTotalSize(
            matchingAssetRequests,
          );
          const percentageCompressed =
            (matchingAssetRequests.filter(isCompressed).length /
              matchingAssetRequests.length) *
            100;

          assetGroup.bytesUncompressed = Math.round(
            (totalBytesTransferred / 100) * percentageCompressed,
          );
          assetGroup.bytesCompressed = Math.round(
            totalBytesTransferred - assetGroup.bytesUncompressed,
          );

          assetGroup.name = assetGroupName;

          assetGroup.cdnPercentage =
            (matchingAssetRequests.filter(isCdn).length /
              matchingAssetRequests.length) *
            100;
          assetGroup.cachePercentage =
            (matchingAssetRequests.filter(isCacheable).length /
              matchingAssetRequests.length) *
            100;

          pathStats.assetGroups.add(assetGroup);
        }
      }
    }

    await this.browserMetricsPathService.save(path);

    const totalBytes = await calculateTotalSize(networkRequests);

    // keep compatible with old response (for quick scan UI)
    const result: any = {
      total: {
        domain: null,
        pageTitle: path.title,
        hosting: [
          {
            domain: topDomain.fqdn,
            green: topDomain.isGreenHost,
          },
        ],
        // requests: networkRequests,
        // requests: [],
        numberOfRequests: networkRequests.length,
        time: {
          domReady: domReadyTime,
          load: loadTime,
          networkIdle: networkIdleTime,
        },
        totalBytes: await calculateTotalSize(networkRequests),
        totalBytesFormatted: formatBytes(totalBytes),
        estimatedCo2: co2Emission.perVisit(totalBytes, topDomain.isGreenHost),
        cdnPercentage:
          (networkRequests.filter(isCdn).length / networkRequests.length) * 100,
        compressedPercentage:
          (networkRequests.filter(isCompressed).length /
            networkRequests.length) *
          100,
        cachePercentage:
          (networkRequests.filter(isCacheable).length /
            networkRequests.length) *
          100,
        fileTypes: {
          images: await toFileTypeResult(
            networkRequests.filter(findRequestByContentType(['image/'])),
            topDomain.isGreenHost,
          ),
          scripts: await toFileTypeResult(
            networkRequests.filter(findRequestByContentType(['javascript'])),
            topDomain.isGreenHost,
          ),
          stylesheets: await toFileTypeResult(
            networkRequests.filter(findRequestByContentType(['text/css'])),
            topDomain.isGreenHost,
          ),
          json: await toFileTypeResult(
            networkRequests.filter(findRequestByContentType(['json'])),
            topDomain.isGreenHost,
          ),
          fonts: await toFileTypeResult(
            networkRequests.filter(findRequestByContentType(['font'])),
            topDomain.isGreenHost,
          ),
          video: await toFileTypeResult(
            networkRequests.filter(findRequestByContentType(['video'])),
            topDomain.isGreenHost,
          ),
          audio: await toFileTypeResult(
            networkRequests.filter(findRequestByContentType(['audio'])),
            topDomain.isGreenHost,
          ),
        },
      },
      domains: [],
    };

    void browser.close();

    return result;
  }
}
