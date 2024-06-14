import { Injectable } from '@nestjs/common';
import { User } from '@app/user/entities/user.entity';
import { UserOrganizationRole } from '@app/project/entities/user-organization-role.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

@Injectable()
export class UserOrganizationRoleService {
  constructor(
    @InjectRepository(UserOrganizationRole)
    private organizationRoleRepository: EntityRepository<UserOrganizationRole>,
  ) {}

  // async findAllForUser(user: User): Promise<UserOrganizationRole[]> {
  //   return this.organizationRoleRepository.find({ userId: user.id });
  // }
}
