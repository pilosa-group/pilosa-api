import { Injectable } from '@nestjs/common';
import { CreateBrowserMetricDto } from './dto/create-browser-metric.dto';
import { FrontendApp } from './entities/frontend-app.entity';
import { BrowserMetric } from './entities/browser-metric.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, wrap } from '@mikro-orm/postgresql';
import { MetricPeriod } from '@app/cloud/enum/metric-period.enum';
import * as bytes from 'bytes';

export interface PeriodMetric {
  period: Date;
  count: number;
  bytes: number;
  bytesFormatted: string;
}

@Injectable()
export class BrowserMetricService {
  constructor(
    @InjectRepository(BrowserMetric)
    private browserMetricRepository: EntityRepository<BrowserMetric>,
  ) {}

  async create(
    browserMetricDto: CreateBrowserMetricDto,
    frontendApp: FrontendApp,
  ): Promise<BrowserMetric> {
    const metric = new BrowserMetric();
    wrap(metric).assign(browserMetricDto);
    metric.frontendApp = frontendApp;

    return metric;
  }

  async save(browserMetric: BrowserMetric): Promise<BrowserMetric> {
    this.browserMetricRepository.getEntityManager().persist(browserMetric);

    await this.browserMetricRepository.getEntityManager().flush();

    return browserMetric;
  }

  async findUnscannedPaths(): Promise<string> {
    const [result] = await this.browserMetricRepository
      .getEntityManager()
      .getConnection()
      .execute<[{ domain: string; path: string }]>(
        `SELECT bm.domain, path, count(bm) as visits, COUNT(DISTINCT ps.id)
         FROM browser_metric bm
                  LEFT JOIN path_statistics ps ON ps.path_domain = bm.domain AND ps.path_path = path

         WHERE bm."firstLoad" = true
         GROUP BY bm.domain, path
         HAVING COUNT(DISTINCT ps.id) = 0
            AND COUNT(bm) > 150
         ORDER BY visits DESC`,
      );

    return `https://${result.domain}${result.path}`;
  }

  async findByFrontendApp(
    frontendApp: FrontendApp['id'],
    {
      period = MetricPeriod.DAY,
      limit = 100,
      offset = 0,
    }: { period: MetricPeriod; limit?: number; offset?: number },
  ): Promise<PeriodMetric[]> {
    const metrics = await this.browserMetricRepository
      .getEntityManager()
      .getConnection()
      .execute<Omit<PeriodMetric, 'bytesFormatted'>[]>(
        `SELECT time_bucket(?, time) AS period,

                COUNT(*),
                SUM("bytesCompressed") + SUM("bytesUncompressed") AS bytes

         FROM browser_metric

         WHERE "frontendApp" = ?
         GROUP BY period
         ORDER BY period DESC
         LIMIT ? OFFSET ?
        `,
        [period, frontendApp, limit, offset] as any,
      );

    console.log(metrics[0].bytes);

    return metrics.map((metric: any) => ({
      period: metric.period,
      count: metric.count,
      bytes: metric.bytes,
      bytesFormatted: bytes(metric.bytes),
    }));
  }
}
