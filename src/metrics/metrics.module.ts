import { Module } from '@nestjs/common';
import { BeaconController } from './beacon.controller';
import { ClientsModule } from '../clients/clients.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerMetric } from './entities/server-metric.entity';
import { ServerMetricService } from './server-metric.service';
import { ServerMetricsController } from './server-metrics.controller';

@Module({
  controllers: [BeaconController, ServerMetricsController],
  providers: [ServerMetricService],
  imports: [
    ClientsModule,
    ConfigModule,
    TypeOrmModule.forFeature([ServerMetric]),
  ],
  exports: [ServerMetricService],
})
export class MetricsModule {}
