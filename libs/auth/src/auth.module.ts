import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { JwtStrategy } from '@app/auth/strategies/jwt.strategy';
import { UserModule } from '@app/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, UserModule],
  providers: [JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
