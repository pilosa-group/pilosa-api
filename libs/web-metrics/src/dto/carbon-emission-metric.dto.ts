import {
  MetricPeriod,
  MetricPeriodValue,
} from '@app/cloud/enum/metric-period.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CarbonEmissionMetricDto {
  @Expose()
  @ApiProperty({ type: 'number' })
  bytes!: number;

  @Expose()
  @ApiProperty({ type: 'string' })
  bytesFormatted!: string;

  @Expose()
  @ApiProperty({ type: 'number' })
  co2!: number;

  @Expose()
  @ApiProperty({ enum: MetricPeriod, type: 'enum' })
  period!: MetricPeriodValue;

  constructor(partial: CarbonEmissionMetricDto) {
    Object.assign(this, partial);
  }
}
