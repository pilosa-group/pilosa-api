import { PaginatorDto } from '@app/api/paginator.dto';
import {
  MetricPeriod,
  MetricPeriodValue,
} from '@app/cloud/enum/metric-period.enum';
import { CarbonEmissionMetricDto } from '@app/web-metrics/dto/carbon-emission-metric.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, wrap } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { co2 } from '@tgwf/co2';
import * as bytes from 'bytes';

import { CreateBrowserMetricDto } from './dto/create-browser-metric.dto';
import { BrowserMetric } from './entities/browser-metric.entity';
import { FrontendApp } from './entities/frontend-app.entity';

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

  async findByFrontendApp(
    frontendApp: FrontendApp,
    {
      limit = 100,
      offset = 0,
      period = MetricPeriod.DAY,
    }: { limit?: number; offset?: number; period: MetricPeriod },
  ): Promise<PaginatorDto<CarbonEmissionMetricDto>> {
    const query = `SELECT time_bucket(?, time) as period,
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
      .execute(query, [period, frontendApp.id, limit, offset]);

    return new PaginatorDto<CarbonEmissionMetricDto>(
      result.map((metric) => {
        return new CarbonEmissionMetricDto({
          bytes: metric.bytes,
          bytesFormatted: bytes.format(metric.bytes, { unitSeparator: ' ' }),
          co2: (this.co2Emission.perByte(metric.bytes) as any).total,
          period: metric.period as unknown as MetricPeriodValue,
        });
      }),
      {
        limit,
        offset,
        total: result.length,
      },
    );
  }

  async findLatestUnscannedUrl(): Promise<null | string> {
    const [result] = await this.browserMetricRepository
      .getEntityManager()
      .getConnection()
      .execute<[{ domain: string; path: string }]>(
        `SELECT bm.domain, bm.path, count(bm) as visits, COUNT(DISTINCT ps.id)
         FROM browser_metric bm
                  LEFT JOIN path_statistics ps ON ps.path_domain = bm.domain AND ps.path_path = path

         WHERE bm."firstLoad" = true
         GROUP BY bm.domain, bm.path
         HAVING COUNT(DISTINCT ps.id) = 0
            AND COUNT(bm) > 150
         ORDER BY visits DESC`,
      );

    if (!result) {
      return null;
    }

    return `https://${result.domain}${result.path}`;
  }

  async save(browserMetric: BrowserMetric): Promise<BrowserMetric> {
    this.browserMetricRepository.getEntityManager().persist(browserMetric);

    await this.browserMetricRepository.getEntityManager().flush();

    return browserMetric;
  }
}
