import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBrowserMetricDto } from './dto/create-browser-metric.dto';
import { FrontendApp } from './entities/frontend-app.entity';
import { BrowserMetric } from './entities/browser-metric.entity';
import { ServerInstance } from '@app/cloud/entities/service-instance.entity';
import { ServerMetric } from '@app/cloud-metrics/entities/server-metric.entity';

type TimeBucket =
  | '1 hour'
  | '45 minutes'
  | '30 minutes'
  | '15 minutes'
  | '5 minutes'
  | '1 minute';

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

  async getMetricsByPeriod(
    serverInstanceId: ServerInstance['id'],
    timeBucket: TimeBucket,
    start: Date,
    end: Date,
  ): Promise<ServerMetric[]> {
    // SELECT time_bucket('10 minutes', time) AS bucket,
    //
    // COUNT(*),
    // AVG(cpu) AS cpu,
    //   AVG("networkIn") AS networkIn,
    //   AVG("networkOut") AS networkOut
    //
    // FROM server_metric
    // WHERE time > NOW() - INTERVAL '3 hours'
    // GROUP BY bucket
    // ORDER BY bucket DESC
    //

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
