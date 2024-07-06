import { PaginatorOptionsDto } from '@app/api/paginator-options.dto';
import { MetricsPeriodOptionsDto } from '@app/web-metrics/dto/metrics-period-options.dto';
import { IntersectionType } from '@nestjs/swagger';

export class GetBrowserMetricsOptionsDto extends IntersectionType(
  PaginatorOptionsDto,
  MetricsPeriodOptionsDto,
) {}
