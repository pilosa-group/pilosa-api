import { Injectable } from '@nestjs/common';
import { CloudProviderAccount } from '@app/cloud/entities/cloud-provider-account.entity';
import { Project } from '@app/project/entities/project.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class CloudProviderAccountService {
  constructor(
    @InjectRepository(CloudProviderAccount)
    private cloudProviderAccountRepository: EntityRepository<CloudProviderAccount>,
  ) {}

  async findOneLatestImported(): Promise<CloudProviderAccount | null> {
    return this.cloudProviderAccountRepository
      .createQueryBuilder()
      .where({
        lastImportedAt: {
          $lt: new Date(new Date().getTime() - 5 * 60 * 1000),
        },
      })
      .orderBy({
        lastImportedAt: 'ASC',
      })
      .getSingleResult();
  }

  async save(
    cloudProviderAccount: CloudProviderAccount,
  ): Promise<CloudProviderAccount> {
    return this.cloudProviderAccountRepository.upsert(cloudProviderAccount);
  }

  async findAllByProject(project: Project): Promise<CloudProviderAccount[]> {
    return this.cloudProviderAccountRepository.find({
      project,
    });
  }
}
