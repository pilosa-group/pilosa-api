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

  findOne(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      id,
    });
  }

  async findOrCreateOneByClerkId(
    user: CreateUserDto,
  ): Promise<User | undefined> {
    const existingUser = await this.userRepository.findOne(
      {
        clerkId: user.clerkId,
      },
      {
        cache: 5 * 1000,
      },
    );

    if (!existingUser) {
      const newUser = this.userRepository.create(user);

      return this.userRepository.upsert(newUser);
    }

    return existingUser;
  }
}
