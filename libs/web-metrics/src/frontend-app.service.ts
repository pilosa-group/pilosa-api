import { Project } from '@app/project/entities/project.entity';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { FrontendApp } from './entities/frontend-app.entity';

@Injectable()
export class FrontendAppService {
  constructor(
    @InjectRepository(FrontendApp)
    private frontendAppRepository: EntityRepository<FrontendApp>,
  ) {}

  async findByProject(
    project: Project | Project['id'],
  ): Promise<FrontendApp[]> {
    return this.frontendAppRepository.find({
      project,
    });
  }

  async findOneById(id: FrontendApp['id']): Promise<FrontendApp> {
    return this.frontendAppRepository.findOne(
      { id },
      {
        cache: 60 * 1000, // 1 minute
      },
    );
  }
}
