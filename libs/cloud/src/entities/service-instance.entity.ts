import {
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryKey,
  Property,
  Collection,
} from '@mikro-orm/core';
import { CloudProviderAccount } from './cloud-provider-account.entity';
import { InstanceTag } from '../cloud-provider-instance-list.interface';
import { ServerMetric } from '@app/cloud-metrics/entities/server-metric.entity';

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

  @OneToMany(
    () => ServerMetric,
    (metric: ServerMetric) => metric.serverInstance,
  )
  metrics = new Collection<ServerMetric>(this);
}
