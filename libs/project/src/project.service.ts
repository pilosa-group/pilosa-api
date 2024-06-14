import { Injectable } from '@nestjs/common';
import { UserProjectRole } from '@app/project/entities/user-project-role.entity';
import { Project } from '@app/project/entities/project.entity';
import { User } from '@app/user/entities/user.entity';
import { Organization } from '@app/project/entities/organization.entity';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: EntityRepository<Project>,
  ) {}

  // async findByUserRole(userProjectRole: UserProjectRole): Promise<Project> {
  //   return this.projectRepository.findOne(
  //     { userRoles: userProjectRole },
  //     { populate: ['userRoles'] },
  //   );
  // }
  //
  // async findById(id: string, user: User): Promise<Project | undefined> {
  //   return this.projectRepository
  //     .createQueryBuilder('p')
  //     .innerJoin('p.userRoles', 'upr')
  //     .where('p.id = :id', { id })
  //     .andWhere('upr.userId = :userId', { userId: user.id })
  //     .getOne();
  // }
  //
  // async findAllByOrganization(organization: Organization): Promise<Project[]> {
  //   return this.projectRepository
  //     .createQueryBuilder('p')
  //     .where('p.organizationId = :organizationId', {
  //       organizationId: organization.id,
  //     })
  //     .getMany();
  // }
}
