import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { UserOrganizationRole } from '@app/project/entities/user-organization-role.entity';
import { UserProjectRole } from '@app/project/entities/user-project-role.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity()
@Exclude()
export class User {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  @Expose()
  id: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date(), nullable: true })
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
