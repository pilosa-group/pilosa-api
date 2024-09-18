import { Organization } from '@app/project/entities/organization.entity';
import { OrganizationRole } from '@app/project/enum/organization-role.enum';
import { User } from '@app/user/entities/user.entity';
import { Entity, Enum, ManyToOne, PrimaryKey } from '@mikro-orm/core';

@Entity({ tableName: 'organization_member' })
export class OrganizationMember {
  @PrimaryKey({ defaultRaw: 'gen_random_uuid()', type: 'uuid' })
  id: string;

  @ManyToOne({
    deleteRule: 'cascade',
    entity: () => Organization,
  })
  organization!: Organization;

  @Enum(() => OrganizationRole)
  role: OrganizationRole = OrganizationRole.MEMBER;

  @ManyToOne({
    deleteRule: 'cascade',
    entity: () => User,
  })
  user: User;
}
