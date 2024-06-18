import { Injectable } from '@nestjs/common';
import { User } from '@app/user/entities/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: EntityRepository<User>,
  ) {}

  async findOrCreateOneByClerkId(clerkId: string): Promise<User | undefined> {
    const existingUser = await this.userRepository.findOne({
      clerkId,
    });

    if (!existingUser) {
      const newUser = this.userRepository.create({
        clerkId,
      });

      return this.userRepository.upsert(newUser);
    }

    return existingUser;
  }
}
