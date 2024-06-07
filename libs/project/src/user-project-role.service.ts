import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@app/user/entities/user.entity';
import { UserProjectRole } from '@app/project/entities/user-project-role.entity';

@Injectable()
export class UserProjectRoleService {
  constructor(
    @InjectRepository(UserProjectRole)
    private projectRoleRepository: Repository<UserProjectRole>,
  ) {}

  async findAllForUser(user: User): Promise<UserProjectRole[]> {
    return this.projectRoleRepository
      .createQueryBuilder('pr')
      .leftJoin('pr.project', 'p')
      .where('pr.userId = :userId', { userId: user.id })
      .getMany();
  }
}
