import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/user/entities/user.entity';
import { MeController } from '@app/user/controllers/me.controller';

@Module({
  controllers: [MeController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService],
})
export class UserModule {}
