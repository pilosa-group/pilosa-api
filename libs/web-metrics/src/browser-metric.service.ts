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
import { CarbonEmissionMetric } from '@app/web-metrics/dto/carbon-emission-metric.dto';
import { co2 } from '@tgwf/co2';
import { PaginatorDto } from '@app/api/paginator.dto';

@Injectable()
export class BrowserMetricService {
  private co2Emission = new co2({ results: 'segment' });

  constructor(
    @InjectRepository(BrowserMetric)
    private browserMetricRepository: EntityRepository<BrowserMetric>,
  ) {}

  async create(
    browserMetricDto: CreateBrowserMetricDto,
    frontendApp: FrontendApp['id'],
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

  async findLatestUnscannedUrl(): Promise<string | null> {
    const [result] = await this.browserMetricRepository
      .getEntityManager()
      .getConnection()
      .execute<[{ domain: string; path: string }]>(
        `SELECT bm.domain, bm.path, count(bm) as visits, COUNT(DISTINCT ps.id)
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
  ): Promise<PaginatorDto<CarbonEmissionMetric>> {
    const query = `SELECT time_bucket(?, time)                              as period,
           SUM("bytesCompressed") + SUM("bytesUncompressed") as bytes
    FROM browser_metric
    WHERE "frontendApp" = ?
    GROUP BY period
    ORDER BY period ASC
     LIMIT ? OFFSET ?
    `;

    const result = await this.browserMetricRepository
      .getEntityManager()
      .getConnection()
      .execute(query, [period, frontendApp, limit, offset]);

    return new PaginatorDto<CarbonEmissionMetric>(
      result.map((metric) => {
        return new CarbonEmissionMetric({
          period: metric.period as unknown as MetricPeriodValue,
          co2: (this.co2Emission.perByte(metric.bytes) as any).total,
          bytes: metric.bytes,
          bytesFormatted: bytes.format(metric.bytes, { unitSeparator: ' ' }),
        });
      }),
      {
        limit,
        offset,
        total: result.length,
      },
    );
  }
}
