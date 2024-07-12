import { OrganizationMember } from '@app/project/entities/organization-member.entity';
import { Project } from '@app/project/entities/project.entity';
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

  @OneToMany(
    () => OrganizationMember,
    (organizationMember) => organizationMember.organization,
  )
  members = new Collection<OrganizationMember>(this);

  @Property()
  name: string;

  @OneToMany(() => Project, (project: Project) => project.organization)
  projects = new Collection<Project>(this);

  @Property({ unique: true })
  slug!: string;

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt?: Date;
}
