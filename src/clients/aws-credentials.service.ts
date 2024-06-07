import { Injectable } from '@nestjs/common';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AWSCredentials } from './entities/aws-credentials.spec';

@Injectable()
export class AwsCredentialsService {
  constructor(
    @InjectRepository(AWSCredentials)
    private awsCredentialsRepository: Repository<AWSCredentials>,
  ) {}

  async findOneByClient(client: Client): Promise<AWSCredentials | undefined> {
    return this.awsCredentialsRepository
      .createQueryBuilder('awsCredentials')
      .leftJoinAndSelect('awsCredentials.client', 'client')
      .where('client.id = :id', { id: client.id })
      .getOne();
  }
}
