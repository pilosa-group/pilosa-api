import { CloudProvider } from '@app/cloud/enum/cloud-provider.enum';
import { Project } from '@app/project/entities/project.entity';
import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

import { ServerInstance } from './server-instance.entity';

@Entity()
export class CloudProviderAccount {
  @Property()
  accessKeyId!: string;

  @Property()
  createdAt = new Date();

  @PrimaryKey({ defaultRaw: 'gen_random_uuid()', type: 'uuid' })
  id: string;

  @Property()
  lastImportedAt!: Date;

  @ManyToOne({
    deleteRule: 'cascade',
    entity: () => Project,
  })
  project!: Project;

  @Enum(() => CloudProvider)
  provider: CloudProvider = CloudProvider.AWS;

  @Property()
  region!: string;

  @Property()
  secretAccessKey!: string;

  @OneToMany(
    () => ServerInstance,
    (serverInstance: ServerInstance) => serverInstance.cloudProviderAccount,
  )
  serverInstances = new Collection<ServerInstance>(this);

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt?: Date;
}
