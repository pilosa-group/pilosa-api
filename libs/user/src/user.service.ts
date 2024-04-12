import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@app/user/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOrCreateOneByClerkId(clerkId: string): Promise<User | undefined> {
    const existingUser = await this.userRepository.findOneBy({
      clerkId,
    });

    if (!existingUser) {
      const newUser = this.userRepository.create({
        clerkId,
      });

      return this.userRepository.save(newUser);
    }

    return existingUser;
  }
}
