import { Module } from '@nestjs/common';
import { ProjectModule } from '@app/project';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeaconController } from '@app/web-metrics/beacon.controller';
import { FrontendAppService } from '@app/web-metrics/frontend-app.service';
import { BrowserMetricService } from '@app/web-metrics/browser-metric.service';
import { BrowserMetric } from '@app/web-metrics/entities/browser-metric.entity';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';
import { BrowserMetricsController } from '@app/web-metrics/browser-metrics.controller';

@Module({
  controllers: [BeaconController, BrowserMetricsController],
  providers: [FrontendAppService, BrowserMetricService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([BrowserMetric, FrontendApp]),
  ],
  exports: [FrontendAppService],
})
export class WebMetricsModule {}
