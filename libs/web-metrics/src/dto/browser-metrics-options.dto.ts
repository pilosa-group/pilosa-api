import { IntersectionType } from '@nestjs/swagger';
import { PaginatorOptionsDto } from '@app/api/paginator-options.dto';
import { MetricsPeriodOptionsDto } from '@app/web-metrics/dto/metrics-period-options.dto';

export class GetBrowserMetricsOptionsDto extends IntersectionType(
  PaginatorOptionsDto,
  MetricsPeriodOptionsDto,
) {}
