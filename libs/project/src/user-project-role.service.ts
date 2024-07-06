import { UserProjectRole } from '@app/project/entities/user-project-role.entity';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserProjectRoleService {
  constructor(
    @InjectRepository(UserProjectRole)
    private projectRoleRepository: EntityRepository<UserProjectRole>,
  ) {}

  // async findAllForUser(user: User): Promise<UserProjectRole[]> {
  //   return this.projectRoleRepository.find({ userId: user.id });
  // }
}
