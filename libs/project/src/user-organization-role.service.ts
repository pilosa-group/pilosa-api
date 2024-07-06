import { UserOrganizationRole } from '@app/project/entities/user-organization-role.entity';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

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
