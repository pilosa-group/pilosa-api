import { Module } from '@nestjs/common';
import { JwtStrategy } from '@app/auth/strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { UserModule } from '@app/user/user.module';
// import { MeResolver } from '@app/auth/resolvers/me.resolver';

@Module({
  imports: [ConfigModule, UserModule],
  providers: [
    JwtStrategy,
    JwtAuthGuard,
    // MeResolver
  ],
})
export class AuthModule {}
