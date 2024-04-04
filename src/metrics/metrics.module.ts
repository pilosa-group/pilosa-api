import { Module } from '@nestjs/common';
import { BeaconController } from './beacon.controller';
import { ClientsModule } from '../clients/clients.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerMetric } from './entities/server-metric.entity';
import { ServerMetricService } from './server-metric.service';
import { ServerMetricsController } from './server-metrics.controller';
import { BrowserMetric } from './entities/browser-metric.entity';
import { SnippetConfig } from './entities/snippet-config.entity';
import { FrontendApp } from './entities/frontend-app.entity';
import { FrontendAppService } from './frontend-app.service';
import { BrowserMetricService } from './browser-metric.service';

@Module({
  controllers: [BeaconController, ServerMetricsController],
  providers: [ServerMetricService, FrontendAppService, BrowserMetricService],
  imports: [
    ClientsModule,
    ConfigModule,
    TypeOrmModule.forFeature([
      ServerMetric,
      BrowserMetric,
      SnippetConfig,
      FrontendApp,
    ]),
  ],
  exports: [ServerMetricService],
})
export class MetricsModule {}
