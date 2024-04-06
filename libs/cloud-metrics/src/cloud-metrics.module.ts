import { Module } from '@nestjs/common';
import { ClientModule } from '@app/client';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerMetric } from '@app/cloud-metrics/entities/server-metric.entity';
import { ServerMetricsController } from '@app/cloud-metrics/server-metrics.controller';
import { ServerMetricService } from '@app/cloud-metrics/server-metric.service';

@Module({
  controllers: [ServerMetricsController],
  providers: [ServerMetricService],
  imports: [
    ClientModule,
    ConfigModule,
    TypeOrmModule.forFeature([ServerMetric]),
  ],
  exports: [ServerMetricService],
})
export class CloudMetricsModule {}
