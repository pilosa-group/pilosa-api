import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateRequestContext } from '@mikro-orm/core';
import { MikroORM } from '@mikro-orm/core';
import { BrowserMetricService } from '@app/web-metrics/browser-metric.service';
import { SyntheticScanService } from '@app/synthetic-scan';

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

    await this.syntheticScanService.run(url, {
      scrollToEnd: false,
    });

    this.isRunning = false;
  }
}
