import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { User } from '@app/user/entities/user.entity';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: EntityRepository<User>,
  ) {}

  async findOrCreateOneByClerkId(
    user: CreateUserDto,
  ): Promise<User | undefined> {
    const existingUser = await this.userRepository.findOne({
      clerkId: user.clerkId,
    });

    if (!existingUser) {
      const newUser = this.userRepository.create(user);

      return this.userRepository.upsert(newUser);
    }

    return existingUser;
  }
}
