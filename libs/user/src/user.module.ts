import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/user/entities/user.entity';
import { MeController } from '@app/user/controllers/me.controller';
import { UserResolver } from '@app/user/resolver/user.resolver';
import { ProjectModule } from '@app/project/project.module';

@Module({
  controllers: [MeController],
  providers: [UserService, UserResolver],
  imports: [TypeOrmModule.forFeature([User]), ProjectModule],
  exports: [UserService],
})
export class UserModule {}
