import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';

import { InstanceTag } from '../cloud-provider-instance-list.interface';
import { CloudProviderAccount } from './cloud-provider-account.entity';

@Entity()
export class ServerInstance {
  @Property()
  class!: string;

  @ManyToOne({
    deleteRule: 'cascade',
    entity: () => CloudProviderAccount,
  })
  cloudProviderAccount!: CloudProviderAccount;

  @Property()
  createdAt = new Date();

  @PrimaryKey({ defaultRaw: 'gen_random_uuid()', type: 'uuid' })
  id: string;

  @Property()
  instanceId!: string;

  @Property()
  state!: string;

  @Property({ type: 'json' })
  tags: InstanceTag[] = [];

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt?: Date;
}
