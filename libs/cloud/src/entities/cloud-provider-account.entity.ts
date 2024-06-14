import {
  PrimaryKey,
  Entity,
  OneToMany,
  ManyToOne,
  Property,
  Enum,
  Collection,
} from '@mikro-orm/core';
import { ServerInstance } from './service-instance.entity';
import { Project } from '@app/project/entities/project.entity';
import { CloudProvider } from '@app/cloud/enum/cloud-provider.enum';

@Entity()
export class CloudProviderAccount {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt?: Date;

  @Enum(() => CloudProvider)
  provider: CloudProvider = CloudProvider.AWS;

  @Property()
  lastImportedAt!: Date;

  @Property()
  accessKeyId!: string;

  @Property()
  secretAccessKey!: string;

  @Property()
  region!: string;

  @ManyToOne({
    entity: () => Project,
  })
  project!: Project;

  @OneToMany(
    () => ServerInstance,
    (serverInstance: ServerInstance) => serverInstance.cloudProviderAccount,
  )
  serverInstances = new Collection<ServerInstance>(this);
}
