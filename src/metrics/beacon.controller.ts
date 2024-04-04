import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Options,
  Post,
  Req,
  Res,
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
  @Header('Access-Control-Allow-Headers', FRONTEND_APP_ID)
  async options() {
    return null;
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async create(
    @Body() createBrowserMetricDto: CreateBrowserMetricDto,
    @Req() req: Request,
  ) {
    const frontendAppId = req.headers[FRONTEND_APP_ID] as Client['id'];
    const frontendApp =
      await this.frontendAppService.findOneById(frontendAppId);

    if (!frontendApp) {
      throw new NotFoundException(`App ${frontendAppId} not found`);
    }

    const origin = req.headers['origin'] as string;
    const isAllowed =
      frontendApp.urls?.includes(origin) || frontendApp.urls?.includes('*');

    if (!isAllowed) {
      throw new ForbiddenException('Invalid domain');
    }

    const browserMetric = await this.browserMetricService.create(
      { ...createBrowserMetricDto, u: req.headers['user-agent'] as string },
      frontendApp,
    );

    void this.browserMetricService.save(browserMetric);

    return null;
  }
}
