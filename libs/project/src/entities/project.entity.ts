import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';
import { CloudProviderAccount } from '@app/cloud/entities/cloud-provider-account.entity';
import { Organization } from '@app/project/entities/organization.entity';
import { UserProjectRole } from '@app/project/entities/user-project-role.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  @Field()
  name: string;

  @ManyToOne(
    () => Organization,
    (organization: Organization) => organization.projects,
  )
  @JoinColumn()
  organization: Project;

  @OneToMany(() => UserProjectRole, (projectToUser) => projectToUser.project)
  @Field(() => [UserProjectRole], { nullable: 'items' })
  public userRoles: UserProjectRole[];

  @OneToMany(
    () => CloudProviderAccount,
    (cloudProviderAccount: CloudProviderAccount) =>
      cloudProviderAccount.project,
  )
  @Field(() => [CloudProviderAccount], { nullable: 'items' })
  cloudProviderAccounts: CloudProviderAccount[];

  @OneToMany(
    () => FrontendApp,
    (frontendApp: FrontendApp) => frontendApp.project,
  )
  @Field(() => [FrontendApp], { nullable: 'items' })
  frontendApps: FrontendApp[];
}
