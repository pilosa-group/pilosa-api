import { Injectable } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@app/user/entities/user.entity';
import { UserProjectRole } from '@app/project/entities/user-project-role.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(UserProjectRole)
    private projectRoleRepository: Repository<UserProjectRole>,

    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async findAllForUser(user: User): Promise<UserProjectRole[]> {
    return this.projectRoleRepository
      .createQueryBuilder('pr')
      .leftJoin('pr.project', 'p')
      .where('pr.userId = :userId', { userId: user.id })
      .getMany();
  }

  async findOne(id: string): Promise<Project | undefined> {
    return this.projectRepository
      .createQueryBuilder('p')
      .where('id = :id', { id })
      .getOne();
  }
}
