import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { BrowserMetricService } from '@app/web-metrics/browser-metric.service';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';
import { CarbonEmissionMetric } from '@app/web-metrics/dto/carbon-emission-metric.dto';
import { PaginatorDto } from '@app/api/paginator.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetBrowserMetricsOptionsDto } from '@app/web-metrics/dto/browser-metrics-options.dto';

@ApiBearerAuth()
@ApiTags('Metrics')
@Controller('browser-metrics')
export class BrowserMetricsController {
  constructor(private browserMetricsService: BrowserMetricService) {}

  @Get('/:frontendAppId')
  async getMetrics(
    @Param('frontendAppId', ParseUUIDPipe) frontendAppId: FrontendApp['id'],
    @Query() { limit = 100, offset = 0, period }: GetBrowserMetricsOptionsDto,
  ): Promise<PaginatorDto<CarbonEmissionMetric>> {
    return this.browserMetricsService.findByFrontendApp(frontendAppId, {
      limit,
      offset,
      period,
    });
  }
}
