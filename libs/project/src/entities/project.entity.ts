import {
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryKey,
  Property,
  Collection,
} from '@mikro-orm/core';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';
import { CloudProviderAccount } from '@app/cloud/entities/cloud-provider-account.entity';
import { UserProjectRole } from '@app/project/entities/user-project-role.entity';
import { Organization } from '@app/project/entities/organization.entity';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Project {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  @Expose()
  @ApiProperty({ type: 'string', format: 'uuid' })
  id: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date(), nullable: true })
  updatedAt?: Date;

  @Property()
  @Expose()
  @ApiProperty()
  name!: string;

  @ManyToOne({
    entity: () => Organization,
    deleteRule: 'cascade',
  })
  organization!: Organization;

  @OneToMany(() => UserProjectRole, (projectToUser) => projectToUser.project)
  userRoles = new Collection<UserProjectRole>(this);

  @OneToMany(
    () => CloudProviderAccount,
    (cloudProviderAccount: CloudProviderAccount) =>
      cloudProviderAccount.project,
  )
  cloudProviderAccounts = new Collection<CloudProviderAccount>(this);

  @OneToMany(
    () => FrontendApp,
    (frontendApp: FrontendApp) => frontendApp.project,
  )
  frontendApps = new Collection<FrontendApp>(this);
}
