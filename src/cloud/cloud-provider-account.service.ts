import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudProviderAccount } from './entities/cloud-provider-account';

@Injectable()
export class CloudProviderAccountService {
  constructor(
    @InjectRepository(CloudProviderAccount)
    private cloudProviderAccountRepository: Repository<CloudProviderAccount>,
  ) {}

  async findOneLatestImported(): Promise<CloudProviderAccount | null> {
    return this.cloudProviderAccountRepository
      .createQueryBuilder('cpa')
      .orderBy('cpa.lastImportedAt', 'ASC')
      .getOne();
  }

  async save(
    cloudProviderAccount: CloudProviderAccount,
  ): Promise<CloudProviderAccount> {
    return this.cloudProviderAccountRepository.save(cloudProviderAccount);
  }
}
