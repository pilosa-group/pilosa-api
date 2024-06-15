import { Injectable } from '@nestjs/common';
import { BrowserMetricPath } from '@app/web-metrics/entities/browser-metric-path.entity';
import { CreateBrowserMetricPathDto } from '@app/web-metrics/dto/create-browser-metric-path.dto';
import { BrowserMetricDomain } from '@app/web-metrics/entities/browser-metric-domain.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, wrap } from '@mikro-orm/core';

@Injectable()
export class BrowserMetricPathService {
  constructor(
    @InjectRepository(BrowserMetricPath)
    private browserMetricPathRepository: EntityRepository<BrowserMetricPath>,
  ) {}

  async create(
    pathDto: CreateBrowserMetricPathDto,
  ): Promise<BrowserMetricPath> {
    const path = new BrowserMetricPath();
    wrap(path).assign(pathDto);

    return path;
  }

  async save(browserMetricPath: BrowserMetricPath): Promise<BrowserMetricPath> {
    const path = this.browserMetricPathRepository.create(browserMetricPath);

    await this.browserMetricPathRepository
      .getEntityManager()
      .persistAndFlush(path);

    return path;
  }

  async findOneByDomainPath(
    domain: BrowserMetricDomain,
    path: string,
  ): Promise<BrowserMetricPath> {
    return this.browserMetricPathRepository.findOne(
      {
        domain,
        path,
      },
      {
        populate: ['domain'],
      },
    );
  }
}
