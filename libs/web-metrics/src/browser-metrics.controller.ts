import { Controller, Get, Param, Query } from '@nestjs/common';
import { BrowserMetricService } from '@app/web-metrics/browser-metric.service';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';
import { MetricPeriod } from '@app/cloud/enum/metric-period.enum';
import { BrowserMetric } from '@app/web-metrics/entities/browser-metric.entity';
import { CarbonEmissionMetric } from '@app/web-metrics/dto/carbon-emission-metric.dto';

export type PaginatorInput = {
  limit?: number;
  offset?: number;
};

type Parameters = {
  period?: MetricPeriod;
};

export interface PaginatorResult<T extends object> {
  items: T[];
  pagination: {
    offset: number;
    limit: number;
    total: number;
  };
}

export const createPaginatorResult = <T extends object>(
  items: T[],
  { total, limit, offset }: { total: number; limit: number; offset: number },
): PaginatorResult<T> => ({
  items,
  pagination: {
    limit: Number(limit),
    offset: Number(offset),
    total: Number(total),
  },
});

@Controller('browser-metrics')
export class BrowserMetricsController {
  constructor(private browserMetricsService: BrowserMetricService) {}

  @Get('/:frontendAppId')
  async getMetrics(
    @Param('frontendAppId') frontendAppId: FrontendApp['id'],
    @Query() { limit = 100, offset = 0, period }: PaginatorInput & Parameters,
  ): Promise<PaginatorResult<CarbonEmissionMetric>> {
    return this.browserMetricsService.findByFrontendApp(frontendAppId, {
      limit,
      offset,
      period,
    });
  }
}
