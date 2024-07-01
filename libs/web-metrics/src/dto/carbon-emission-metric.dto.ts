import { Expose } from 'class-transformer';
import { MetricPeriodValue } from '@app/cloud/enum/metric-period.enum';

export class CarbonEmissionMetric {
  @Expose()
  period!: MetricPeriodValue;

  @Expose()
  bytes!: number;

  @Expose()
  bytesFormatted!: string;

  @Expose()
  co2!: number;

  constructor(partial: CarbonEmissionMetric) {
    Object.assign(this, partial);
  }
}
