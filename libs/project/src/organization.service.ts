import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@app/user/entities/user.entity';
import { Organization } from '@app/project/entities/organization.entity';
import { UserOrganizationRole } from '@app/project/entities/user-organization-role.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  async findByUserRole(
    userOrganizationRole: UserOrganizationRole,
  ): Promise<Organization> {
    return this.organizationRepository
      .createQueryBuilder('o')
      .innerJoin('o.userRoles', 'uor')
      .where('uor.id = :id', { id: userOrganizationRole.id })
      .getOne();
  }

  async findById(id: string, user: User): Promise<Organization | undefined> {
    return this.organizationRepository
      .createQueryBuilder('o')
      .innerJoin('o.userRoles', 'uor')
      .where('o.id = :id', { id })
      .andWhere('uor.userId = :userId', { userId: user.id })
      .getOne();
  }
}
