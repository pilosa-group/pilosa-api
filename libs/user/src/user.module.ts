import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MeController } from '@app/user/controllers/me.controller';
// import { UserResolver } from '@app/user/resolver/user.resolver';
import { ProjectModule } from '@app/project/project.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '@app/user/entities/user.entity';

@Module({
  controllers: [MeController],
  providers: [
    UserService,
    //UserResolver
  ],
  imports: [MikroOrmModule.forFeature([User]), ProjectModule],
  exports: [UserService],
})
export class UserModule {}
