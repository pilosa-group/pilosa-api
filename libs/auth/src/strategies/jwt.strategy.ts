import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';
import { ClerkConfig } from '../../../../apps/project-green-nest/src/config/configuration';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configService.get<ClerkConfig>('clerk').issuerUrl}/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: configService.get<ClerkConfig>('clerk').issuerUrl,
      algorithms: ['RS256'],
    });
  }

  validate(payload: unknown): unknown {
    console.log('JWT Payload', payload);
    return payload;
  }
}
