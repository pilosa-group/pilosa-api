import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ServerMetricService } from './server-metric.service';

@Controller('metrics/server')
export class ServerMetricsController {
  constructor(private serverMetricService: ServerMetricService) {}

  @Get()
  async options(@Res() res: Response) {
    const endDate = new Date();

    const startDate = new Date(endDate);
    startDate.setHours(startDate.getHours() - 1);

    const metrics = await this.serverMetricService.getMetricsByPeriod(
      '3c122f81-f090-4275-9670-ebf326bd9dea',
      '1 minute',
      startDate,
      endDate,
    );

    return res.send(metrics);
  }
}
