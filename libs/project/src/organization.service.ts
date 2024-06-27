import { Injectable } from '@nestjs/common';
import { Organization } from '@app/project/entities/organization.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: EntityRepository<Organization>,
  ) {}

  async findAll(): Promise<Organization[]> {
    return this.organizationRepository.findAll();
  }

  async findOne(id: string): Promise<Organization | null> {
    return this.organizationRepository.findOne({ id });
  }

  // async findByUserRole(
  //   userOrganizationRole: UserOrganizationRole,
  // ): Promise<Organization> {
  //   return this.organizationRepository.findOne({
  //     userRoles: {
  //       $in: [userOrganizationRole],
  //     },
  //   });
  // }
  //
  // async findById(id: string): Promise<Organization | undefined> {
  //   return this.organizationRepository.findOne({ id });
  // }
}
