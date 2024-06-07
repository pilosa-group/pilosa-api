import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@app/user/entities/user.entity';
import { UserOrganizationRole } from '@app/project/entities/user-organization-role.entity';

@Injectable()
export class UserOrganizationRoleService {
  constructor(
    @InjectRepository(UserOrganizationRole)
    private organizationRoleRepository: Repository<UserOrganizationRole>,
  ) {}

  async findAllForUser(user: User): Promise<UserOrganizationRole[]> {
    return this.organizationRoleRepository
      .createQueryBuilder('or')
      .leftJoin('or.organization', 'o')
      .where('or.userId = :userId', { userId: user.id })
      .getMany();
  }
}
