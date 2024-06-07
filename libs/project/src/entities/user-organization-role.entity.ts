import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Organization } from '@app/project/entities/organization.entity';
import { User } from '@app/user/entities/user.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserProjectRole } from '@app/project/entities/user-project-role.entity';

@Entity({ name: 'organization_to_user' })
@ObjectType()
export class UserOrganizationRole {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  public id: string;

  @Column()
  public organizationId: string;

  @Column()
  public userId: string;

  @Column()
  @Field()
  public role: string;

  @ManyToOne(() => Organization, (organization) => organization.userRoles)
  @Field((type) => Organization)
  public organization: Organization;

  @ManyToOne(() => User, (user) => user.organizationRoles)
  @Field((type) => User)
  public user: User;
}
