import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FrontendApp } from './entities/frontend-app.entity';
import { Project } from '@app/project/entities/project.entity';

@Injectable()
export class FrontendAppService {
  constructor(
    @InjectRepository(FrontendApp)
    private frontendAppRepository: Repository<FrontendApp>,
  ) {}

  async findOneById(id: FrontendApp['id']): Promise<FrontendApp> {
    return this.frontendAppRepository.findOneBy({
      id,
    });
  }

  async findAllByProject(project: Project): Promise<FrontendApp[]> {
    return this.frontendAppRepository
      .createQueryBuilder('fa')
      .where('fa.projectId = :projectId', { projectId: project.id })
      .getMany();
  }
}
