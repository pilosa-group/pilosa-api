import { Expose } from 'class-transformer';
import {
  MetricPeriod,
  MetricPeriodValue,
} from '@app/cloud/enum/metric-period.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CarbonEmissionMetricDto {
  @Expose()
  @ApiProperty({ type: 'enum', enum: MetricPeriod })
  period!: MetricPeriodValue;

  @Expose()
  @ApiProperty({ type: 'number' })
  bytes!: number;

  @Expose()
  @ApiProperty({ type: 'string' })
  bytesFormatted!: string;

  @Expose()
  @ApiProperty({ type: 'number' })
  co2!: number;

  constructor(partial: CarbonEmissionMetricDto) {
    Object.assign(this, partial);
  }
}
