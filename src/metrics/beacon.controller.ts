import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Options,
  Post,
  Req,
  Header,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';

import { CreateBrowserMetricDto } from './dto/create-browser-metric.dto';
import { Client } from '../clients/entities/client.entity';
import { FrontendAppService } from './frontend-app.service';
import { BrowserMetricService } from './browser-metric.service';

const FRONTEND_APP_ID = 'x-id';

@Controller('beacon')
export class BeaconController {
  constructor(
    private frontendAppService: FrontendAppService,
    private browserMetricService: BrowserMetricService,
  ) {}

  @Options()
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
  ) {
    console.log({ createBrowserMetricDto });
    const frontendAppId = req.headers[FRONTEND_APP_ID] as Client['id'];
    const frontendApp =
      await this.frontendAppService.findOneById(frontendAppId);

    if (!frontendApp) {
      throw new ForbiddenException(`App ${frontendAppId} not found`);
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
      },
      frontendApp,
    );

    void this.browserMetricService.save(browserMetric);

    return null;
  }
}
