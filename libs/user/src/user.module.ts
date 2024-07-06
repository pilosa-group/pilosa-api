import { ProjectModule } from '@app/project/project.module';
import { MeController } from '@app/user/controllers/me.controller';
import { User } from '@app/user/entities/user.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { UserService } from './user.service';

@Module({
  controllers: [MeController],
  exports: [UserService],
  imports: [MikroOrmModule.forFeature([User]), ProjectModule],
  providers: [UserService],
})
export class UserModule {}
