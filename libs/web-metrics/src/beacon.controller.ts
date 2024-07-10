import { Public } from '@app/auth/decorators/public.decorator';
import { ClientIp } from '@app/web-metrics/decorators/client-ip.decorator';
import { RequestHeaders } from '@app/web-metrics/decorators/request-headers.decorator';
import { BeaconPayloadDto } from '@app/web-metrics/dto/beacon-payload.dto';
import {
  BeaconRequestHeadersDto,
  FRONTEND_APP_ID_HEADER_NAME,
} from '@app/web-metrics/dto/beacon-request-headers.dto';
import { ColorScheme } from '@app/web-metrics/entities/browser-metric.entity';
import { isValidInitiatorType } from '@app/web-metrics/utils/isValidInitiatorType';
import {
  Body,
  Controller,
  ForbiddenException,
  Header,
  HttpCode,
  HttpStatus,
  Logger,
  Options,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBody,
  ApiExcludeEndpoint,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import * as crypto from 'crypto';
import { Request } from 'express';
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

import { BrowserMetricService } from './browser-metric.service';
import { CreateBrowserMetricDto } from './dto/create-browser-metric.dto';
import { FrontendAppService } from './frontend-app.service';

function hashValue(value: string) {
  const salt = new Date().toISOString().split('T')[0];
  const hash = crypto.createHash('sha256');
  hash.update(`${salt}${value}`);
  return hash.digest('hex');
}

const nullableExtensions = ['__none__', '_'];

@Controller('beacon')
@ApiTags('Beacon')
export class BeaconController {
  private readonly logger = new Logger(BeaconController.name);

  constructor(
    private frontendAppService: FrontendAppService,
    private browserMetricService: BrowserMetricService,
  ) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.ACCEPTED)
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Methods', 'POST')
  @Header(
    'Access-Control-Allow-Headers',
    [FRONTEND_APP_ID_HEADER_NAME, 'Content-Type'].join(','),
  )
  @ApiBody({
    type: BeaconPayloadDto,
  })
  @ApiHeader({
    description: 'App ID required to identify and validate the frontend app',
    name: FRONTEND_APP_ID_HEADER_NAME,
    required: true,
  })
  @ApiOperation({
    operationId: 'createBrowserMetric',
    summary: 'Create browser metric',
  })
  @ApiResponse({ description: 'Accepted', status: HttpStatus.ACCEPTED })
  @ApiResponse({ description: 'Forbidden', status: HttpStatus.FORBIDDEN })
  @ApiResponse({ description: 'Bad Request', status: HttpStatus.BAD_REQUEST })
  async create(
    @Body() payload: BeaconPayloadDto,
    @RequestHeaders()
    {
      [FRONTEND_APP_ID_HEADER_NAME]: frontendAppId,
      referer,
    }: BeaconRequestHeadersDto,
    @Req() req: Request,
    @ClientIp() clientIp: string,
  ) {
    try {
      const frontendApp =
        await this.frontendAppService.findOneByIdForBeacon(frontendAppId);

      if (!frontendApp) {
        throw new ForbiddenException(`App ${frontendAppId} not found`);
      }

      const url = new URL(referer);

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

      Object.keys(payload.d).forEach((domain) => {
        Object.keys(payload.d[domain]).forEach((path) => {
          Object.keys(payload.d[domain][path]).forEach((initiatorType) => {
            if (isValidInitiatorType(initiatorType)) {
              Object.keys(payload.d[domain][path][initiatorType]).forEach(
                async (extension) => {
                  const {
                    b: bytes,
                    co: crossOrigins,
                    l: pageLoaded,
                  } = payload.d[domain][path][initiatorType][extension];

                  const [bytesCompressed, bytesUncompressed] = bytes;

                  if (bytesCompressed > 0 || bytesUncompressed > 0) {
                    const metric: CreateBrowserMetricDto = {
                      browser,
                      bytesCompressed,
                      bytesUncompressed,
                      colorScheme:
                        payload.m === 'd'
                          ? ColorScheme.Dark
                          : ColorScheme.Light,
                      cpu,
                      device,
                      deviceType,
                      domain,
                      extension: nullableExtensions.includes(extension)
                        ? null
                        : extension,
                      initiatorType,
                      os,
                      pageLoaded,
                      path,
                      viewportHeight: payload.v[1],
                      viewportWidth: payload.v[0],
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
                        frontendApp.id,
                      );

                    void this.browserMetricService.save(browserMetric);
                  }

                  if (crossOrigins.length) {
                    // TODO store this in backend, so we can tell the client to add these to the CORS policy
                    // console.log(initiatorType, extension, crossOrigins);
                  }
                },
              );
            }
          });
        });
      });
    } catch (error) {
      this.logger.error(error);
      Sentry.captureException(error);

      throw error;
    }

    return null;
  }

  @Options()
  @Public()
  @HttpCode(HttpStatus.ACCEPTED)
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Methods', 'POST')
  @Header(
    'Access-Control-Allow-Headers',
    [FRONTEND_APP_ID_HEADER_NAME, 'Content-Type'].join(','),
  )
  @ApiExcludeEndpoint()
  async options() {
    return null;
  }
}
