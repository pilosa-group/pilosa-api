import { Module } from '@nestjs/common';
import { JwtStrategy } from '@app/auth/strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';

@Module({
  imports: [ConfigModule],
  providers: [JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
