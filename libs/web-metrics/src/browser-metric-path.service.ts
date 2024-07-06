import { CreatePathDto } from '@app/web-metrics/dto/create-path.dto';
import { Domain } from '@app/web-metrics/entities/domain.entity';
import { Path } from '@app/web-metrics/entities/path.entity';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BrowserMetricPathService {
  constructor(
    @InjectRepository(Path)
    private browserMetricPathRepository: EntityRepository<Path>,
  ) {}

  async create(pathDto: CreatePathDto): Promise<Path> {
    return new Path(pathDto.domain, pathDto.path);
  }

  async findOneByDomainPath(domain: Domain, path: string): Promise<Path> {
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

  async save(browserMetricPath: Path): Promise<Path> {
    const path = this.browserMetricPathRepository.create(browserMetricPath);

    await this.browserMetricPathRepository
      .getEntityManager()
      .persistAndFlush(path);

    return path;
  }
}
