import { Injectable } from '@nestjs/common';
import { CreateBrowserMetricDto } from './dto/create-browser-metric.dto';
import { FrontendApp } from './entities/frontend-app.entity';
import { BrowserMetric } from './entities/browser-metric.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, wrap } from '@mikro-orm/postgresql';
import {
  MetricPeriod,
  MetricPeriodValue,
} from '@app/cloud/enum/metric-period.enum';
import * as bytes from 'bytes';
import { PaginatorResult } from '@app/web-metrics/browser-metrics.controller';
import { CarbonEmissionMetric } from '@app/web-metrics/dto/carbon-emission-metric.dto';
import { co2 } from '@tgwf/co2';

@Injectable()
export class BrowserMetricService {
  private co2Emission = new co2({ results: 'segment' });

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
  ): Promise<PaginatorResult<CarbonEmissionMetric>> {
    const query = `SELECT time_bucket(?, time)                              as period,
           SUM("bytesCompressed") + SUM("bytesUncompressed") as bytes
    FROM browser_metric
    WHERE "frontendApp" = ?
    GROUP BY period
    ORDER BY period ASC`;

    const result = await this.browserMetricRepository
      .getEntityManager()
      .getConnection()
      .execute(query, [period, frontendApp]);

    return {
      items: result.map(
        (metric) =>
          new CarbonEmissionMetric({
            period: metric.period as unknown as MetricPeriodValue,
            co2: this.co2Emission.perByte(metric.bytes, true),
            bytes: metric.bytes,
            bytesFormatted: bytes.format(metric.bytes, { unitSeparator: ' ' }),
          }),
      ),
      pagination: {
        limit,
        offset,
        total: result.length,
      },
    };
  }
}
