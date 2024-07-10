import { OrganizationMember } from '@app/project/entities/organization-member.entity';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrganizationMemberService {
  constructor(
    @InjectRepository(OrganizationMember)
    private organizationRoleRepository: EntityRepository<OrganizationMember>,
  ) {}

  // async findAllForUser(user: User): Promise<UserOrganizationRole[]> {
  //   return this.organizationRoleRepository.find({ userId: user.id });
  // }
}
