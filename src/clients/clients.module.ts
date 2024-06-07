import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { AWSCredentials } from './entities/aws-credentials.spec';
import { AwsCredentialsService } from './aws-credentials.service';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, AwsCredentialsService],
  exports: [ClientsService, AwsCredentialsService],
  imports: [TypeOrmModule.forFeature([Client, AWSCredentials])],
})
export class ClientsModule {}
