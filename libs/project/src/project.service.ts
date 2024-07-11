import { Project } from '@app/project/entities/project.entity';
import { UserDto } from '@app/user/dto/user.dto';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: EntityRepository<Project>,
  ) {}

  findOne(id: string, user: UserDto): Promise<Project | null> {
    return this.projectRepository.findOne({
      id,
      members: {
        user: {
          id: user.id,
        },
      },
    });
  }

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
