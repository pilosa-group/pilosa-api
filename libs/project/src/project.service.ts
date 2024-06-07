import { Injectable } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectRepository.createQueryBuilder('p').getMany();
  }

  async findOne(id: string): Promise<Project | undefined> {
    return this.projectRepository
      .createQueryBuilder('p')
      .where('p.id = :id', { id })
      .getOne();
  }
}
