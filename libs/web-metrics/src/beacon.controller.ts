import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Options,
  Post,
  Req,
  Header,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';

import { CreateBrowserMetricDto } from './dto/create-browser-metric.dto';
import { FrontendAppService } from './frontend-app.service';
import { BrowserMetricService } from './browser-metric.service';
import { Project } from '@app/project/entities/project.entity';
import { Public } from '@app/auth/decorators/public.decorator';
import { ClientIp } from '@app/web-metrics/decorators/client-ip.decorator';
import * as crypto from 'crypto';

function hashValue(value: string) {
  const hash = crypto.createHash('sha256');
  hash.update(value);
  return hash.digest('hex');
}

const FRONTEND_APP_ID = 'x-id';

// TODO this is duplicated
type FirstPageLoad = boolean;
type Timestamp = number;
type InitiatorType = string;
type Domain = string;
type Path = string;
type Origin = string;
type NumberOfBytes = number;
type FileExtension = string;
type CompressedBytes = NumberOfBytes;
type UncompressedBytes = NumberOfBytes;

type CombinedPayload = {
  f: FirstPageLoad;
  t: Timestamp;
  b: [CompressedBytes, UncompressedBytes];
  d: {
    [key: Domain]: {
      [key: Path]: {
        [key: InitiatorType]: {
          [key: FileExtension]: {
            b: [CompressedBytes, UncompressedBytes];
            co: Origin[];
          };
        };
      };
    };
  };
};

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
    const frontendAppId = req.headers[FRONTEND_APP_ID] as Project['id'];
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
      throw new ForbiddenException('Invalid domain');
    }

    const userAgent = req.headers['user-agent'] as string;
    const visitor = hashValue(`${clientIp}${userAgent}`);

    Object.keys(createBrowserMetricDto.d).forEach((domain) => {
      Object.keys(createBrowserMetricDto.d[domain]).forEach((path) => {
        Object.keys(createBrowserMetricDto.d[domain][path]).forEach(
          (initiatorType) => {
            if (isValidInitiatorType(initiatorType)) {
              Object.keys(
                createBrowserMetricDto.d[domain][path][initiatorType],
              ).forEach(async (extension) => {
                const { b: bytes, co: crossOrigins } =
                  createBrowserMetricDto.d[domain][path][initiatorType][
                    extension
                  ];

                const [bytesCompressed, bytesUncompressed] = bytes;

                if (bytesCompressed > 0 || bytesUncompressed > 0) {
                  const metric: CreateBrowserMetricDto = {
                    firstLoad: createBrowserMetricDto.f,
                    domain,
                    path,
                    initiatorType,
                    extension: extension === '_' ? null : extension,
                    bytesCompressed,
                    bytesUncompressed,
                    userAgent,
                    visitor,
                  };

                  const browserMetric = await this.browserMetricService.create(
                    metric,
                    frontendApp,
                  );

                  void this.browserMetricService.save(browserMetric);
                }

                if (crossOrigins.length) {
                  // TODO store this in backend, so we can tell the client to add these to the CORS policy
                  console.log(initiatorType, extension, crossOrigins);
                }
              });
            }
          },
        );
      });
    });

    return null;
  }
}
