import { CloudProviderAccount } from '@app/cloud/entities/cloud-provider-account.entity';
import { Organization } from '@app/project/entities/organization.entity';
import { UserProjectRole } from '@app/project/entities/user-project-role.entity';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';
import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

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
  @Expose()
  @ApiProperty({ format: 'uuid', type: 'string' })
  id: string;

  @Property()
  @Expose()
  @ApiProperty()
  name!: string;

  @ManyToOne({
    deleteRule: 'cascade',
    entity: () => Organization,
  })
  organization!: Organization;

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt?: Date;

  @OneToMany(() => UserProjectRole, (projectToUser) => projectToUser.project)
  userRoles = new Collection<UserProjectRole>(this);
}
