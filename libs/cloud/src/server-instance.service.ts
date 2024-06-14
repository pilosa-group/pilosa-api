import { Injectable } from '@nestjs/common';
import { Instance } from './cloud-provider-instance-list.interface';
import { Project } from '@app/project/entities/project.entity';
import { CloudProviderAccount } from '@app/cloud/entities/cloud-provider-account.entity';
import { ServerInstance } from '@app/cloud/entities/service-instance.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class ServerInstanceService {
  constructor(
    @InjectRepository(ServerInstance)
    private serverInstanceRepository: EntityRepository<ServerInstance>,
  ) {}

  async findOneById(id: string): Promise<ServerInstance> {
    return this.serverInstanceRepository.findOne({ id });
  }

  /**
   * Find the last imported server instance for a provider,
   * and that was imported more than 5 minutes ago.
   */
  async findOrCreateOneByInstanceId(
    instance: Instance,
    cloudProviderAccount: CloudProviderAccount,
  ): Promise<ServerInstance | null> {
    const serverInstance = await this.serverInstanceRepository.findOne({
      instanceId: instance.id,
      cloudProviderAccount,
    });

    if (serverInstance) {
      serverInstance.state = instance.state;
      serverInstance.tags = instance.tags;

      return this.save(serverInstance);
    }

    const newInstance = new ServerInstance();
    newInstance.instanceId = instance.id;
    newInstance.class = instance.class;
    newInstance.state = instance.state;
    newInstance.cloudProviderAccount = cloudProviderAccount;
    newInstance.tags = instance.tags;

    return this.save(newInstance);
  }

  findAllByProject(projectId: Project['id']): Promise<ServerInstance[]> {
    return this.serverInstanceRepository
      .createQueryBuilder()
      .where({
        cloudProviderAccount: {
          project: {
            id: projectId,
          },
        },
      })
      .getResult();
  }

  findAllByCloudProviderAccount(
    cloudProviderAccount: CloudProviderAccount,
  ): Promise<ServerInstance[]> {
    return this.serverInstanceRepository
      .createQueryBuilder()
      .where({
        cloudProviderAccount: cloudProviderAccount.id,
      })
      .getResult();
  }

  /**
   * Save a server instance.
   *
   * @param serverInstance
   */
  async save(serverInstance: ServerInstance): Promise<ServerInstance> {
    return this.serverInstanceRepository.upsert(serverInstance);
  }
}
