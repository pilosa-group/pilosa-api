import {
  ArrayType,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Organization } from '@app/project/entities/organization.entity';
import { User } from '@app/user/entities/user.entity';
import { Exclude } from 'class-transformer';

@Entity({ tableName: 'organization_to_user' })
@Exclude()
export class UserOrganizationRole {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property({ type: ArrayType })
  roles: string[];

  @ManyToOne({
    entity: () => Organization,
    deleteRule: 'cascade',
  })
  organization!: Organization;

  @ManyToOne({
    entity: () => User,
    deleteRule: 'cascade',
  })
  user: User;
}
