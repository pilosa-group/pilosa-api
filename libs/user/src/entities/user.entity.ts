import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { UserOrganizationRole } from '@app/project/entities/user-organization-role.entity';
import { UserProjectRole } from '@app/project/entities/user-project-role.entity';

@Entity()
export class User {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt?: Date;

  @Property({ unique: true })
  clerkId: string;

  @OneToMany(
    () => UserOrganizationRole,
    (organizationToUser) => organizationToUser.user,
  )
  organizationRoles = new Collection<UserOrganizationRole>(this);

  @OneToMany(() => UserProjectRole, (projectToUser) => projectToUser.user)
  projectRoles = new Collection<UserProjectRole>(this);
}
