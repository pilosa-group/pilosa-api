import { Injectable } from '@nestjs/common';
import { BrowserMetricDomain } from '@app/web-metrics/entities/browser-metric-domain.entity';
import { CreateBrowserMetricDomainDto } from '@app/web-metrics/dto/create-browser-metric-domain.dto';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class BrowserMetricDomainService {
  constructor(
    @InjectRepository(BrowserMetricDomain)
    private browserMetricDomainRepository: EntityRepository<BrowserMetricDomain>,
  ) {}

  async create(
    browserMetricDomainDto: CreateBrowserMetricDomainDto,
  ): Promise<BrowserMetricDomain> {
    return this.browserMetricDomainRepository.create(browserMetricDomainDto);
  }

  async save(
    browserMetricDomain: BrowserMetricDomain,
  ): Promise<BrowserMetricDomain> {
    return this.browserMetricDomainRepository.upsert(browserMetricDomain);
  }

  async findOrCreateOneByDomain(fqdn: string): Promise<BrowserMetricDomain> {
    const existingEntity = await this.browserMetricDomainRepository.findOne(
      {
        fqdn,
      },
      {
        cache: 1000,
      },
    );

    if (existingEntity) {
      return existingEntity;
    }

    const entity = new BrowserMetricDomain(fqdn);
    wrap(entity).assign({ fqdn, isGreenHost: false });

    this.browserMetricDomainRepository.getEntityManager().persist(entity);
    await this.browserMetricDomainRepository.getEntityManager().flush();

    return entity;
  }
}
