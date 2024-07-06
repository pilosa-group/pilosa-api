import { Organization } from '@app/project/entities/organization.entity';
import { User } from '@app/user/entities/user.entity';
import {
  ArrayType,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

@Entity({ tableName: 'organization_to_user' })
export class UserOrganizationRole {
  @PrimaryKey({ defaultRaw: 'gen_random_uuid()', type: 'uuid' })
  id: string;

  @ManyToOne({
    deleteRule: 'cascade',
    entity: () => Organization,
  })
  organization!: Organization;

  @Property({ type: ArrayType })
  roles: string[];

  @ManyToOne({
    deleteRule: 'cascade',
    entity: () => User,
  })
  user: User;
}
