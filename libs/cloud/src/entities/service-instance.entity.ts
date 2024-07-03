import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { CloudProviderAccount } from './cloud-provider-account.entity';
import { InstanceTag } from '../cloud-provider-instance-list.interface';

@Entity()
export class ServerInstance {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date(), nullable: true })
  updatedAt?: Date;

  @Property()
  class!: string;

  @Property()
  state!: string;

  @Property()
  instanceId!: string;

  @Property({ type: 'json' })
  tags: InstanceTag[] = [];

  @ManyToOne({
    entity: () => CloudProviderAccount,
    deleteRule: 'cascade',
  })
  cloudProviderAccount!: CloudProviderAccount;
}
