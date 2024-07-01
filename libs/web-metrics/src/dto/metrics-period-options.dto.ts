import { ApiProperty } from '@nestjs/swagger';
import { MetricPeriod } from '@app/cloud/enum/metric-period.enum';
import { IsEnum } from 'class-validator';

export class MetricsPeriodOptionsDto {
  @ApiProperty({ enum: MetricPeriod, required: false })
  @IsEnum(MetricPeriod)
  readonly period?: MetricPeriod;
}
