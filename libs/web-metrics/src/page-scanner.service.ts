import { SyntheticScanService } from '@app/synthetic-scan';
import { BrowserMetricService } from '@app/web-metrics/browser-metric.service';
import { CreateRequestContext } from '@mikro-orm/core';
import { MikroORM } from '@mikro-orm/core';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as Sentry from '@sentry/node';

@Injectable()
export class PageScannerService {
  private isRunning = false;

  private readonly logger = new Logger(PageScannerService.name);

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

    const url = await this.browserMetricService.findLatestUnscannedUrl();

    if (!url) {
      this.isRunning = false;
      return;
    }

    if (!url) {
      this.isRunning = false;
      return;
    }

    this.logger.log(`Scanning ${url}`);

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
