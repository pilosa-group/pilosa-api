import { Injectable, Logger } from '@nestjs/common';
import type { Request, Response } from 'playwright';
import { chromium } from 'playwright';
import { co2 } from '@tgwf/co2';
import { calculateTotalSize } from './utils/calculateTotalSize';
import { isCdn } from './utils/isCdn';
import { isCacheable } from './utils/isCacheable';
import { findRequestByContentType } from './utils/findRequestByContentType';
import { Path } from '@app/web-metrics/entities/path.entity';
import { findRequestByDomain } from '@app/synthetic-scan/utils/findRequestByDomain';
import {
  assetGroupKeys,
  assetGroups,
  AssetGroupStatistics,
} from '@app/web-metrics/entities/asset-group-statistics.entity';
import { GreenHostingService } from '@app/synthetic-scan/green-hosting.service';
import { BrowserMetricDomainService } from '@app/web-metrics/browser-metric-domain.service';
import { BrowserMetricPathService } from '@app/web-metrics/browser-metric-path.service';
import { PathStatistics } from '@app/web-metrics/entities/path-statistics.entity';
import { isCompressed } from '@app/synthetic-scan/utils/isCompressed';
import { formatBytes } from '@app/synthetic-scan/utils/formatBytes';
import { plainToInstance } from 'class-transformer';
import { ScanResultV1Dto } from '@app/synthetic-scan/dto/scan-result-v1.dto';
import { scrollPageToEnd } from '@app/synthetic-scan/utils/playwright';

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

export type ResultV1 = {
  domain: string | null;
  pageTitle: string;
  numberOfRequests: number;
  hosting: Array<{
    domain: string;
    green: boolean;
  }>;
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
  fileTypes: Record<string, FileTypeResult>;
};

const ignoreDomains = ['localhost'];

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

type SyntheticScanOptions = {
  scrollToEnd?: boolean;
};

const defaultOptions: SyntheticScanOptions = {
  scrollToEnd: true,
};

@Injectable()
export class SyntheticScanService {
  private readonly logger = new Logger(SyntheticScanService.name);

  constructor(
    private greenHostingService: GreenHostingService,
    private browserMetricsDomainService: BrowserMetricDomainService,
    private browserMetricsPathService: BrowserMetricPathService,
  ) {}

  async run(
    url: string,
    { scrollToEnd }: SyntheticScanOptions = defaultOptions,
  ): Promise<ScanResultV1Dto> {
    this.logger.log(`Running quick scan for ${url}`);

    const urlObject = new URL(url);

    const topDomain =
      await this.browserMetricsDomainService.findOrCreateOneByDomain(
        urlObject.hostname,
      );

    let path: Path = undefined;

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

    await page.goto(url);

    await page.waitForLoadState('load');

    const networkIdleTime = (Date.now() - startTime) / 1000;

    if (scrollToEnd) {
      await scrollPageToEnd(page);
    }

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
      path = new Path(topDomain, urlObject.pathname);
      path.domain = topDomain;

      topDomain.paths.add(path);
    }

    path.title = await page.title();

    const pathStats = new PathStatistics();

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
          const assetGroup = new AssetGroupStatistics();
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
    const result = plainToInstance<ScanResultV1Dto, ResultV1>(ScanResultV1Dto, {
      domain: null,
      pageTitle: path.title,
      hosting: [
        {
          domain: topDomain.fqdn,
          green: topDomain.isGreenHost,
        },
      ],
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
        (networkRequests.filter(isCompressed).length / networkRequests.length) *
        100,
      cachePercentage:
        (networkRequests.filter(isCacheable).length / networkRequests.length) *
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
          networkRequests.filter(
            findRequestByContentType(['video', 'application/vnd.yt-ump']),
          ),
          topDomain.isGreenHost,
        ),
        audio: await toFileTypeResult(
          networkRequests.filter(findRequestByContentType(['audio'])),
          topDomain.isGreenHost,
        ),
      },
    });

    void browser.close();

    return result;
  }
}
