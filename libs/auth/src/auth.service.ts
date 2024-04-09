import { Injectable } from '@nestjs/common';
import { UserService } from '@app/user';
import { User } from '@app/user/entities/user.entity';
import { PasswordHashService } from '@app/auth/password-hash.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '@app/auth/types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private passwordHashService: PasswordHashService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByEmailAddress(email);

    if (user) {
      const isPasswordCorrect = await this.passwordHashService.compare(
        password,
        user.password,
      );

      if (isPasswordCorrect) {
        return user;
      }
    }

    return null;
  }

  async login(user: User) {
    const payload: JwtPayload = {
      email: user.email,
      name: user.name,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
