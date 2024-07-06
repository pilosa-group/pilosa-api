import { ServerMetric } from '@app/cloud-metrics/entities/server-metric.entity';
import { ServerMetricService } from '@app/cloud-metrics/server-metric.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  exports: [ServerMetricService],
  imports: [ConfigModule, MikroOrmModule.forFeature([ServerMetric])],
  providers: [ServerMetricService],
})
export class CloudMetricsModule {}
