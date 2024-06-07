import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Organization } from '@app/project/entities/organization.entity';
import { User } from '@app/user/entities/user.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql/type';

@Entity({ name: 'organization_to_user' })
@ObjectType()
export class UserOrganizationRole {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  public id: string;

  @Column()
  public organizationId: string;

  @Column()
  public userId: string;

  @Column('simple-array')
  @Field(() => [GraphQLString])
  public roles: string[];

  @ManyToOne(() => Organization, (organization) => organization.userRoles)
  @Field(() => Organization)
  public organization: Organization;

  @ManyToOne(() => User, (user) => user.organizationRoles)
  @Field(() => User)
  public user: User;
}
