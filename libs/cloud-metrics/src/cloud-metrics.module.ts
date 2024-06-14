import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServerMetricService } from '@app/cloud-metrics/server-metric.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ServerMetric } from '@app/cloud-metrics/entities/server-metric.entity';

@Module({
  providers: [ServerMetricService],
  imports: [ConfigModule, MikroOrmModule.forFeature([ServerMetric])],
  exports: [ServerMetricService],
})
export class CloudMetricsModule {}
