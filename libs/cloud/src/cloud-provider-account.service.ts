import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudProviderAccount } from '@app/cloud/entities/cloud-provider-account.entity';

@Injectable()
export class CloudProviderAccountService {
  constructor(
    @InjectRepository(CloudProviderAccount)
    private cloudProviderAccountRepository: Repository<CloudProviderAccount>,
  ) {}

  async findOneLatestImported(): Promise<CloudProviderAccount | null> {
    return this.cloudProviderAccountRepository
      .createQueryBuilder('cpa')
      .where('cpa.lastImportedAt < :lastImportedAt', {
        lastImportedAt: new Date(new Date().getTime() - 5 * 60 * 1000),
      })
      .orderBy('cpa.lastImportedAt', 'ASC')
      .getOne();
  }

  async save(
    cloudProviderAccount: CloudProviderAccount,
  ): Promise<CloudProviderAccount> {
    return this.cloudProviderAccountRepository.save(cloudProviderAccount);
  }
}
