import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWTConfig } from '../../../../apps/project-green-nest/src/config/configuration';
import { JwtPayload } from '@app/auth/types';
import { UserService } from '@app/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<JWTConfig>('jwt').secret,
    });
  }

  async validate(payload: JwtPayload) {
    return this.userService.findOneById(payload.sub);
  }
}
