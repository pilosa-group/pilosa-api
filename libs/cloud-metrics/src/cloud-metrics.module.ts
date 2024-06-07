import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerMetric } from '@app/cloud-metrics/entities/server-metric.entity';
import { ServerMetricService } from '@app/cloud-metrics/server-metric.service';

@Module({
  providers: [ServerMetricService],
  imports: [ConfigModule, TypeOrmModule.forFeature([ServerMetric])],
  exports: [ServerMetricService],
})
export class CloudMetricsModule {}
