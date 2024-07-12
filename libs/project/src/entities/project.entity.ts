import { CloudProviderAccount } from '@app/cloud/entities/cloud-provider-account.entity';
import { Organization } from '@app/project/entities/organization.entity';
import { ProjectMember } from '@app/project/entities/project-member.entity';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';
import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

@Entity()
export class Project {
  @OneToMany(
    () => CloudProviderAccount,
    (cloudProviderAccount: CloudProviderAccount) =>
      cloudProviderAccount.project,
  )
  cloudProviderAccounts = new Collection<CloudProviderAccount>(this);

  @Property()
  createdAt = new Date();

  @OneToMany(
    () => FrontendApp,
    (frontendApp: FrontendApp) => frontendApp.project,
  )
  frontendApps = new Collection<FrontendApp>(this);

  @PrimaryKey({ defaultRaw: 'gen_random_uuid()', type: 'uuid' })
  id: string;

  @OneToMany(() => ProjectMember, (projectMember) => projectMember.project)
  members = new Collection<ProjectMember>(this);

  @Property()
  name!: string;

  @ManyToOne({
    deleteRule: 'cascade',
    entity: () => Organization,
  })
  organization!: Organization;

  @Property({ unique: true })
  slug!: string;

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt?: Date;
}
