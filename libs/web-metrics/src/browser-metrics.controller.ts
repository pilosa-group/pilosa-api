import { Controller, Get } from '@nestjs/common';
import { BrowserMetricService } from '@app/web-metrics/browser-metric.service';

@Controller('metrics/browser')
export class BrowserMetricsController {
  constructor(private browserMetricsService: BrowserMetricService) {}

  @Get()
  async getMetrics() {
    const endDate = new Date();

    const startDate = new Date(endDate);
    startDate.setHours(startDate.getHours() - 1);

    return this.browserMetricsService.getMetricsByPeriod();
  }
}
