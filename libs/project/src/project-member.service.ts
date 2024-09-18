import { ProjectMember } from '@app/project/entities/project-member.entity';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectMemberService {
  constructor(
    @InjectRepository(ProjectMember)
    private projectRoleRepository: EntityRepository<ProjectMember>,
  ) {}

  // async findAllForUser(user: User): Promise<UserProjectRole[]> {
  //   return this.projectRoleRepository.find({ userId: user.id });
  // }
}
