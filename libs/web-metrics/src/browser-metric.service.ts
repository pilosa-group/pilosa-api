import { Injectable } from '@nestjs/common';
import { CreateBrowserMetricDto } from './dto/create-browser-metric.dto';
import { FrontendApp } from './entities/frontend-app.entity';
import { BrowserMetric } from './entities/browser-metric.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, wrap } from '@mikro-orm/postgresql';

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
        `SELECT bm.domain, path, count(bm) as visits,COUNT(DISTINCT ps.id)
         FROM browser_metric bm
                  LEFT JOIN path_statistics ps ON ps.path_domain = bm.domain AND ps.path_path = bm.path

         WHERE bm."firstLoad" = true
         GROUP BY bm.domain, path
         HAVING COUNT(DISTINCT ps.id) = 0 AND COUNT(bm) > 200
         ORDER BY visits DESC`,
      );

    return `https://${result.domain}${result.path}`;
  }

  // async findAllByFrontendApp(
  //   frontendApp: FrontendApp,
  // ): Promise<BrowserMetric[]> {
  //   return this.browserMetricRepository
  //     .createQueryBuilder('bm')
  //     .where('bm.frontendAppId = :frontendAppId', {
  //       frontendAppId: frontendApp.id,
  //     })
  //     .getMany();
  // }
  //
  // async getMetricsByPeriod(): Promise<ServerMetric[]> {
  //   return this.browserMetricRepository.manager
  //     .query(`SELECT time_bucket('1 minutes', time) AS bucket,
  //
  //    COUNT(*),
  //    AVG(bytes) AS bytes,
  //      AVG("bytesCached") AS bytesCached,
  //      AVG("accuracy") AS accuracy
  //
  //    FROM browser_metric
  //
  //    GROUP BY bucket
  //    ORDER BY bucket DESC`);
  // }
}
