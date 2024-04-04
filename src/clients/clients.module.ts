import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService],
  imports: [TypeOrmModule.forFeature([Client])],
})
export class ClientsModule {}
