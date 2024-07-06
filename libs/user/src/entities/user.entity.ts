import { UserOrganizationRole } from '@app/project/entities/user-organization-role.entity';
import { UserProjectRole } from '@app/project/entities/user-project-role.entity';
import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Expose } from 'class-transformer';

@Entity()
export class User {
  @Property({ unique: true })
  clerkId: string;

  @Property()
  createdAt = new Date();

  @PrimaryKey({ defaultRaw: 'gen_random_uuid()', type: 'uuid' })
  @Expose()
  id: string;

  @OneToMany(
    () => UserOrganizationRole,
    (organizationToUser) => organizationToUser.user,
  )
  organizationRoles = new Collection<UserOrganizationRole>(this);

  @OneToMany(() => UserProjectRole, (projectToUser) => projectToUser.user)
  projectRoles = new Collection<UserProjectRole>(this);

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt?: Date;
}
