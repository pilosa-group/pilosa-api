import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Project } from '@app/project/entities/project.entity';
import { UserOrganizationRole } from '@app/project/entities/user-organization-role.entity';
import { Expose } from 'class-transformer';

@Entity()
export class Organization {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  @Expose()
  id: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date(), nullable: true })
  updatedAt?: Date;

  @Property()
  @Expose()
  name: string;

  @OneToMany(() => Project, (project: Project) => project.organization)
  projects = new Collection<Project>(this);

  @OneToMany(
    () => UserOrganizationRole,
    (organizationToUser) => organizationToUser.organization,
  )
  userRoles = new Collection<UserOrganizationRole>(this);
}
