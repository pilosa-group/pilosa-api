import { OrganizationMember } from '@app/project/entities/organization-member.entity';
import { ProjectMember } from '@app/project/entities/project-member.entity';
import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

@Entity()
export class User {
  @Property({ unique: true })
  clerkId: string;

  @Property()
  createdAt = new Date();

  @Property({ nullable: true })
  email: string;

  @PrimaryKey({ defaultRaw: 'gen_random_uuid()', type: 'uuid' })
  id: string;

  @Property({ nullable: true })
  name!: string;

  @OneToMany(
    () => OrganizationMember,
    (organizationToUser) => organizationToUser.user,
  )
  organizationMembers = new Collection<OrganizationMember>(this);

  @OneToMany(() => ProjectMember, (projectToUser) => projectToUser.user)
  projectMembers = new Collection<ProjectMember>(this);

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt?: Date;
}
