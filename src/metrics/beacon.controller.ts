import {
  Body,
  Controller,
  HttpStatus,
  NotFoundException,
  Options,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ClientsService } from '../clients/clients.service';

import { CreateBrowserMetricDto } from './dto/create-browser-metric.dto';
import { InfluxdbService } from './influxdb.service';

@Controller('beacon')
export class BeaconController {
  constructor(
    private clientsService: ClientsService,
    private influxDb: InfluxdbService,
  ) {}

  @Options()
  async options(@Res() res: Response) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'x-id');

    res.status(HttpStatus.ACCEPTED);

    return res.send();
  }

  @Post()
  async create(
    @Body() createBrowserMetricDto: CreateBrowserMetricDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const clientId = req.headers['x-id'] as string;
    const client = await this.clientsService.findOne(clientId);

    console.log(createBrowserMetricDto);

    if (!client) {
      throw new NotFoundException(`Client ${clientId} not found`);
    }

    // const origin = req.headers['origin'] as string;
    // const isAllowed =
    //   client.urls?.includes(origin) || client.urls?.includes('*');
    //
    // if (!isAllowed) {
    //   throw new ForbiddenException('Invalid domain');
    // }

    // TODO: store user agent for embodied carbon calculations

    this.influxDb.storeBrowserMetric({
      clientId: client.id,
      domain: createBrowserMetricDto.d,
      path: createBrowserMetricDto.p,
      bytes: createBrowserMetricDto.b,
      cachedBytes: createBrowserMetricDto.cb,
      accuracy: createBrowserMetricDto.a,
    });

    await this.influxDb.flush();

    return res.status(HttpStatus.ACCEPTED).send();
  }
}
