import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@app/user';
import { LocalStrategy } from '@app/auth/strategies/local.strategy';
import { JwtStrategy } from '@app/auth/strategies/jwt.strategy';
import { AuthController } from '@app/auth/controllers/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EncryptionService } from '@app/auth/encryption.service';
import { PasswordHashService } from '@app/auth/password-hash.service';
import { JwtModule } from '@nestjs/jwt';
import { JWTConfig } from '../../../apps/project-green-nest/src/config/configuration';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<JWTConfig>('jwt').secret,
        signOptions: {
          expiresIn: 3600,
        },
      }),
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    ConfigService,
    EncryptionService,
    PasswordHashService,
  ],
})
export class AuthModule {}
