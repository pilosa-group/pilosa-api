import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';
import { ClerkConfig } from '../../../../apps/project-green-nest/src/config/configuration';
import { JWTPayload } from '@app/auth/types';
import { UserService } from '@app/user/user.service';
import { User } from '@app/user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    configService: ConfigService,
  ) {
    const clerkConfig = configService.get<ClerkConfig>('clerk');

    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${clerkConfig.issuerUrl}/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: clerkConfig.issuerUrl,
      algorithms: ['RS256'],
    });
  }

  validate(payload: JWTPayload): Promise<User> {
    return this.userService.findOrCreateOneByClerkId(payload.sub);

    // return {
    //   id: user.id,
    //   email: payload.clerk.email,
    //   emailVerified: payload.clerk.email_verified,
    //   firstName: payload.clerk.first_name,
    //   lastName: payload.clerk.last_name,
    //   fullName: payload.clerk.full_name,
    //   avatar: payload.clerk.avatar,
    // };
  }
}
