import { CreateDomainDto } from '@app/web-metrics/dto/create-domain.dto';
import { Domain } from '@app/web-metrics/entities/domain.entity';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BrowserMetricDomainService {
  constructor(
    @InjectRepository(Domain)
    private browserMetricDomainRepository: EntityRepository<Domain>,
  ) {}

  async create(browserMetricDomainDto: CreateDomainDto): Promise<Domain> {
    return this.browserMetricDomainRepository.create(browserMetricDomainDto);
  }

  async findOrCreateOneByDomain(fqdn: string): Promise<Domain> {
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

    const entity = new Domain(fqdn);
    wrap(entity).assign({ fqdn, isGreenHost: false });

    this.browserMetricDomainRepository.getEntityManager().persist(entity);
    await this.browserMetricDomainRepository.getEntityManager().flush();

    return entity;
  }

  async save(browserMetricDomain: Domain): Promise<Domain> {
    return this.browserMetricDomainRepository.upsert(browserMetricDomain);
  }
}
