import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBrowserMetricDto } from './dto/create-browser-metric.dto';
import { FrontendApp } from './entities/frontend-app.entity';
import { BrowserMetric } from './entities/browser-metric.entity';
import { ServerMetric } from '@app/cloud-metrics/entities/server-metric.entity';

@Injectable()
export class BrowserMetricService {
  constructor(
    @InjectRepository(BrowserMetric)
    private browserMetricRepository: Repository<BrowserMetric>,
  ) {}

  async create(
    browserMetricDto: CreateBrowserMetricDto,
    frontendApp: FrontendApp,
  ): Promise<BrowserMetric> {
    return this.browserMetricRepository.create({
      frontendApp: frontendApp,
      ...browserMetricDto,
    });
  }

  async save(browserMetric: BrowserMetric): Promise<BrowserMetric> {
    return this.browserMetricRepository.save(browserMetric);
  }

  async findAllByFrontendApp(
    frontendApp: FrontendApp,
  ): Promise<BrowserMetric[]> {
    return this.browserMetricRepository
      .createQueryBuilder('bm')
      .where('bm.frontendAppId = :frontendAppId', {
        frontendAppId: frontendApp.id,
      })
      .getMany();
  }

  async getMetricsByPeriod(): Promise<ServerMetric[]> {
    return this.browserMetricRepository.manager
      .query(`SELECT time_bucket('1 minutes', time) AS bucket,

     COUNT(*),
     AVG(bytes) AS bytes,
       AVG("bytesCached") AS bytesCached,
       AVG("accuracy") AS accuracy
    
     FROM browser_metric
     
     GROUP BY bucket
     ORDER BY bucket DESC`);
  }
}
