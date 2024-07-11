import { TransformerService } from '@app/api/transformer.service';
import { JWTPayload } from '@app/auth/types';
import { UserDto } from '@app/user/dto/user.dto';
import { User } from '@app/user/entities/user.entity';
import { UserService } from '@app/user/user.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

import {
  AppConfig,
  ClerkConfig,
  ENV_DEVELOPMENT,
} from '../../../../apps/pilosa/src/config/configuration';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private transformerService: TransformerService,
    configService: ConfigService,
  ) {
    const clerkConfig = configService.get<ClerkConfig>('clerk');
    const appConfig = configService.get<AppConfig>('app');

    super({
      algorithms: ['RS256'],
      ignoreExpiration: appConfig.env === ENV_DEVELOPMENT,
      issuer: clerkConfig.issuerUrl,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${clerkConfig.issuerUrl}/.well-known/jwks.json`,
        rateLimit: true,
      }),
    });
  }

  async validate(payload: JWTPayload): Promise<UserDto> {
    const user = await this.userService.findOrCreateOneByClerkId({
      clerkId: payload.sub,
      email: payload.clerk.email,
      name: payload.clerk.full_name,
    });

    return this.transformerService.entityToDto<User, UserDto>(user, UserDto);
  }
}
