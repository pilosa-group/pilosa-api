import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBrowserMetricDto } from './dto/create-browser-metric.dto';
import { FrontendApp } from './entities/frontend-app.entity';
import { BrowserMetric } from './entities/browser-metric.entity';

@Injectable()
export class BrowserMetricService {
  constructor(
    @InjectRepository(BrowserMetric)
    private browserMetricRepository: Repository<BrowserMetric>,
  ) {}

  async create(
    browserMetricDto: CreateBrowserMetricDto & {
      u: string;
    },
    frontendApp: FrontendApp,
  ): Promise<BrowserMetric> {
    return this.browserMetricRepository.create({
      frontendApp: frontendApp,
      time: new Date(),
      bytes: browserMetricDto.b,
      bytesCached: browserMetricDto.bc,
      domain: browserMetricDto.d,
      path: browserMetricDto.p,
      userAgent: browserMetricDto.u,
      accuracy: browserMetricDto.a,
    });
  }

  async save(browserMetric: BrowserMetric): Promise<BrowserMetric> {
    return this.browserMetricRepository.save(browserMetric);
  }
}
