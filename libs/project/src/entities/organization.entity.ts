import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Project } from '@app/project/entities/project.entity';
import { UserOrganizationRole } from '@app/project/entities/user-organization-role.entity';
import { Exclude } from 'class-transformer';

@Entity()
@Exclude()
export class Organization {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date(), nullable: true })
  updatedAt?: Date;

  @Property()
  name: string;

  @OneToMany(() => Project, (project: Project) => project.organization)
  projects = new Collection<Project>(this);

  @OneToMany(
    () => UserOrganizationRole,
    (organizationToUser) => organizationToUser.organization,
  )
  userRoles = new Collection<UserOrganizationRole>(this);
}
