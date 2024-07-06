import { Project } from '@app/project/entities/project.entity';
import { UserOrganizationRole } from '@app/project/entities/user-organization-role.entity';
import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

@Entity()
export class Organization {
  @Property()
  createdAt = new Date();

  @PrimaryKey({ defaultRaw: 'gen_random_uuid()', type: 'uuid' })
  id: string;

  @Property()
  name: string;

  @OneToMany(() => Project, (project: Project) => project.organization)
  projects = new Collection<Project>(this);

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt?: Date;

  @OneToMany(
    () => UserOrganizationRole,
    (organizationToUser) => organizationToUser.organization,
  )
  userRoles = new Collection<UserOrganizationRole>(this);
}
