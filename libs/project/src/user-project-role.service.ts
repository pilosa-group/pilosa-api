import { Injectable } from '@nestjs/common';
import { User } from '@app/user/entities/user.entity';
import { UserProjectRole } from '@app/project/entities/user-project-role.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

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
