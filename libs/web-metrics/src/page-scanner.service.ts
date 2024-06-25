import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateRequestContext } from '@mikro-orm/core';
import { MikroORM } from '@mikro-orm/core';
import { BrowserMetricService } from '@app/web-metrics/browser-metric.service';
import { SyntheticScanService } from '@app/synthetic-scan';
import * as Sentry from '@sentry/node';

@Injectable()
export class PageScannerService {
  private isRunning = false;

  constructor(
    private readonly orm: MikroORM,
    private readonly browserMetricService: BrowserMetricService,
    private readonly syntheticScanService: SyntheticScanService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  @CreateRequestContext()
  async run() {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;

    const url = await this.browserMetricService.findUnscannedPaths();

    console.log('scanning', url);

    try {
      await this.syntheticScanService.run(url, {
        scrollToEnd: false,
      });
    } catch (e) {
      Sentry.captureException(e);
    }

    this.isRunning = false;
  }
}
