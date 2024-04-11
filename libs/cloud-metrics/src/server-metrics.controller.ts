import { Controller, Get } from '@nestjs/common';
import { ServerMetricService } from './server-metric.service';

@Controller('metrics/server')
export class ServerMetricsController {
  constructor(private serverMetricService: ServerMetricService) {}

  @Get()
  async getMetrics() {
    const endDate = new Date();

    const startDate = new Date(endDate);
    startDate.setHours(startDate.getHours() - 1);

    return this.serverMetricService.getMetricsByPeriod(
      '3c122f81-f090-4275-9670-ebf326bd9dea',
      '15 minutes',
      startDate,
      endDate,
    );
  }
}
