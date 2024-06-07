import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { UserOrganizationRole } from '@app/project/entities/user-organization-role.entity';
import { UserProjectRole } from '@app/project/entities/user-project-role.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column('varchar', { unique: true })
  clerkId: string;

  @OneToMany(
    () => UserOrganizationRole,
    (organizationToUser) => organizationToUser.user,
  )
  @Field(() => [UserOrganizationRole], { nullable: 'items' })
  public organizationRoles: UserOrganizationRole[];

  @OneToMany(() => UserProjectRole, (projectToUser) => projectToUser.user)
  @Field(() => [UserProjectRole], { nullable: 'items' })
  public projectRoles: UserProjectRole[];
}
