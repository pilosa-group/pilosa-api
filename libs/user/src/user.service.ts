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

  async findOneById(id: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({
      id,
    });
  }

  async findOneByEmailAddress(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({
      email,
    });
  }
}
