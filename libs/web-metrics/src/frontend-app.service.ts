import { Injectable } from '@nestjs/common';
import { FrontendApp } from './entities/frontend-app.entity';
import { Project } from '@app/project/entities/project.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

@Injectable()
export class FrontendAppService {
  constructor(
    @InjectRepository(FrontendApp)
    private frontendAppRepository: EntityRepository<FrontendApp>,
  ) {}

  async findOneById(id: FrontendApp['id']): Promise<FrontendApp> {
    return this.frontendAppRepository.findOne(
      { id },
      {
        cache: 60 * 1000, // 1 minute
      },
    );
  }

  async findByProject(
    project: Project | Project['id'],
  ): Promise<FrontendApp[]> {
    return this.frontendAppRepository.find({
      project,
    });
  }
}
