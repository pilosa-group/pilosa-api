import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Header,
  HttpCode,
  HttpStatus,
  Options,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import * as Sentry from '@sentry/node';
import { UAParser } from 'ua-parser-js';
import {
  CLIs,
  Crawlers,
  Emails,
  ExtraDevices,
  Fetchers,
  InApps,
  MediaPlayers,
  Modules,
  // @ts-expect-error - missing types
} from 'ua-parser-js/extensions';
import { CreateBrowserMetricDto } from './dto/create-browser-metric.dto';
import { FrontendAppService } from './frontend-app.service';
import { BrowserMetricService } from './browser-metric.service';
import { Project } from '@app/project/entities/project.entity';
import { Public } from '@app/auth/decorators/public.decorator';
import { ClientIp } from '@app/web-metrics/decorators/client-ip.decorator';
import * as crypto from 'crypto';
import { ColorScheme } from '@app/web-metrics/entities/browser-metric.entity';
import { ApiTags } from '@nestjs/swagger';

function hashValue(value: string) {
  const salt = new Date().toISOString().split('T')[0];
  const hash = crypto.createHash('sha256');
  hash.update(`${salt}${value}`);
  return hash.digest('hex');
}

const FRONTEND_APP_ID = 'x-id';

// TODO this is duplicated
type FirstPageLoad = boolean; // @deprecated
type PageLoaded = boolean;
type InitiatorType = string;
type Domain = string;
type Path = string;
type Origin = string;
type NumberOfBytes = number;
type FileExtension = string;
type CompressedBytes = NumberOfBytes;
type UncompressedBytes = NumberOfBytes;

type CombinedPayload = {
  f?: FirstPageLoad; // @deprecated
  m: 'd' | 'l';
  b: [CompressedBytes, UncompressedBytes];
  d: {
    [key: Domain]: {
      [key: Path]: {
        [key: InitiatorType]: {
          [key: FileExtension]: {
            b: [CompressedBytes, UncompressedBytes];
            l: PageLoaded;
            co: Origin[];
          };
        };
      };
    };
  };
};

const nullableExtensions = ['__none__', '_'];

const isValidInitiatorType = (initiatorType: string): boolean =>
  [
    'audio',
    'beacon',
    'body',
    'css',
    'early-hint',
    'embed',
    'fetch',
    'frame',
    'iframe',
    'icon',
    'image',
    'img',
    'input',
    'link',
    'navigation',
    'object',
    'ping',
    'script',
    'track',
    'video',
    'xmlhttprequest',
  ].includes(initiatorType);

@Controller('beacon')
@ApiTags('Beacon')
export class BeaconController {
  constructor(
    private frontendAppService: FrontendAppService,
    private browserMetricService: BrowserMetricService,
  ) {}

  @Options()
  @Public()
  @HttpCode(HttpStatus.ACCEPTED)
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Methods', 'POST')
  @Header(
    'Access-Control-Allow-Headers',
    [FRONTEND_APP_ID, 'Content-Type'].join(','),
  )
  async options() {
    return null;
  }

  @Post()
  @Public()
  @HttpCode(HttpStatus.ACCEPTED)
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Methods', 'POST')
  @Header(
    'Access-Control-Allow-Headers',
    [FRONTEND_APP_ID, 'Content-Type'].join(','),
  )
  async create(
    @Body() createBrowserMetricDto: CombinedPayload,
    @Req() req: Request,
    @ClientIp() clientIp: string,
  ) {
    try {
      const frontendAppId = req.headers[FRONTEND_APP_ID] as Project['id'];

      if (!frontendAppId || frontendAppId.length < 32) {
        throw new BadRequestException('Invalid app id');
      }

      const frontendApp =
        await this.frontendAppService.findOneById(frontendAppId);

      if (!frontendApp) {
        throw new ForbiddenException(`App ${frontendAppId} not found`);
      }

      if (!req.headers['referer']) {
        throw new BadRequestException('Missing referer');
      }

      const url = new URL(req.headers['referer'] as string);

      const isAllowed =
        frontendApp.urls?.includes(url.hostname) ||
        frontendApp.urls?.includes('*');

      if (!isAllowed) {
        throw new ForbiddenException(`Invalid domain ${url.hostname}`);
      }

      const userAgentParser = new UAParser(
        req.headers['user-agent'] as string,
        [
          Crawlers,
          CLIs,
          Emails,
          ExtraDevices,
          InApps,
          Fetchers,
          MediaPlayers,
          Modules,
        ],
      );
      const userAgent = userAgentParser.getResult();
      const deviceType = userAgent.device?.type || 'desktop';
      const device = userAgent.device.model
        ? userAgent.device.toString()
        : null;
      const os = userAgent.os ? userAgent.os.toString() : null;
      const browser = userAgent.browser.name
        ? userAgent.browser.toString()
        : null;
      const cpu = userAgent.cpu?.architecture
        ? userAgent.cpu.architecture
        : null;

      const visitor = hashValue(`${clientIp}${userAgent}`);

      Object.keys(createBrowserMetricDto.d).forEach((domain) => {
        Object.keys(createBrowserMetricDto.d[domain]).forEach((path) => {
          Object.keys(createBrowserMetricDto.d[domain][path]).forEach(
            (initiatorType) => {
              if (isValidInitiatorType(initiatorType)) {
                Object.keys(
                  createBrowserMetricDto.d[domain][path][initiatorType],
                ).forEach(async (extension) => {
                  const {
                    b: bytes,
                    l: pageLoaded,
                    co: crossOrigins,
                  } = createBrowserMetricDto.d[domain][path][initiatorType][
                    extension
                  ];

                  const [bytesCompressed, bytesUncompressed] = bytes;

                  if (bytesCompressed > 0 || bytesUncompressed > 0) {
                    const metric: CreateBrowserMetricDto = {
                      pageLoaded,
                      firstLoad: createBrowserMetricDto.f, // @deprecated
                      colorScheme:
                        createBrowserMetricDto.m === 'd'
                          ? ColorScheme.Dark
                          : ColorScheme.Light,
                      domain,
                      path,
                      initiatorType,
                      extension: nullableExtensions.includes(extension)
                        ? null
                        : extension,
                      bytesCompressed,
                      bytesUncompressed,
                      cpu,
                      browser,
                      deviceType,
                      device,
                      os,
                      visitor,
                    };

                    // Cached page when EXACTLY 300 bytes?
                    if (
                      bytesCompressed === 0 &&
                      bytesUncompressed === 300 &&
                      initiatorType === 'fetch'
                    ) {
                      return;
                    }

                    const browserMetric =
                      await this.browserMetricService.create(
                        metric,
                        frontendApp,
                      );

                    void this.browserMetricService.save(browserMetric);
                  }

                  if (crossOrigins.length) {
                    // TODO store this in backend, so we can tell the client to add these to the CORS policy
                    // console.log(initiatorType, extension, crossOrigins);
                  }
                });
              }
            },
          );
        });
      });
    } catch (error) {
      Sentry.captureException(error);
    }

    return null;
  }
}
