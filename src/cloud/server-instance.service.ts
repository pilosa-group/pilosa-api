import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServerInstance } from './entities/service-instance.entity';
import { CloudProviderAccount } from './entities/cloud-provider-account';
import { Instance } from './cloud-provider-instance-list.interface';

@Injectable()
export class ServerInstanceService {
  constructor(
    @InjectRepository(ServerInstance)
    private serverInstanceRepository: Repository<ServerInstance>,
  ) {}

  /**
   * Find the last imported server instance for a provider,
   * and that was imported more than 5 minutes ago.
   */
  async findOrCreateOneByInstanceId(
    instance: Instance,
    cloudProviderAccount: CloudProviderAccount,
  ): Promise<ServerInstance | null> {
    const serverInstance = await this.serverInstanceRepository
      .createQueryBuilder('ci')
      .where('ci.instanceId = :instanceId', { instanceId: instance.id })
      .andWhere('ci.cloudProviderAccount = :cloudProviderAccount', {
        cloudProviderAccount: cloudProviderAccount.id,
      })
      .getOne();

    if (serverInstance) {
      serverInstance.instanceState = instance.state;
      serverInstance.tags = instance.tags;

      return this.save(serverInstance);
    }

    const newInstance = new ServerInstance();
    newInstance.instanceId = instance.id;
    newInstance.instanceClass = instance.class;
    newInstance.instanceState = instance.state;
    newInstance.cloudProviderAccount = cloudProviderAccount;
    newInstance.tags = instance.tags;

    return this.save(newInstance);
  }

  /**
   * Save a server instance.
   *
   * @param serverInstance
   */
  async save(serverInstance: ServerInstance): Promise<ServerInstance> {
    return this.serverInstanceRepository.save(serverInstance);
  }
}
