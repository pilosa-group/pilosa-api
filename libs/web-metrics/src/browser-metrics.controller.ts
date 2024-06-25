import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  BrowserMetricService,
  PeriodMetric,
} from '@app/web-metrics/browser-metric.service';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';
import { MetricPeriod } from '@app/cloud/enum/metric-period.enum';

export interface PaginatorInput {
  limit?: number;
  offset?: number;
  period?: MetricPeriod;
}

export interface PaginatorOutput<T extends object> {
  items: T[];
  pagination: {
    offset: number;
    limit: number;
    total: number;
  };
}

@Controller('browser-metrics/')
export class BrowserMetricsController {
  constructor(private browserMetricsService: BrowserMetricService) {}

  @Get(':frontendAppId')
  async getMetrics(
    @Param('frontendAppId') frontendAppId: FrontendApp['id'],
    @Query() { limit = 100, offset = 0, period }: PaginatorInput,
  ): Promise<PaginatorOutput<PeriodMetric>> {
    const metrics = await this.browserMetricsService.findByFrontendApp(
      frontendAppId,
      {
        limit,
        offset,
        period,
      },
    );

    return {
      items: metrics,
      pagination: {
        total: metrics.length,
        limit,
        offset,
      },
    };
  }
}
