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

const FRONTEND_APP_ID = 'x-id';

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
    @Body() createBrowserMetricDto: CreateBrowserMetricDto,
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

    const browserMetric = await this.browserMetricService.create(
      {
        ...createBrowserMetricDto,
        p: url.pathname,
        u: req.headers['user-agent'] as string,
        d: url.hostname,
        ip: clientIp,
      },
      frontendApp,
    );

    void this.browserMetricService.save(browserMetric);

    return null;
  }
}
