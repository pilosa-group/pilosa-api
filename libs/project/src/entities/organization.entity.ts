import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Project } from '@app/project/entities/project.entity';
import { UserOrganizationRole } from '@app/project/entities/user-organization-role.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
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

  @OneToMany(() => Project, (project: Project) => project.organization)
  @Field((type) => [Project], { nullable: 'items' })
  projects: Project[];

  @OneToMany(
    () => UserOrganizationRole,
    (organizationToUser) => organizationToUser.organization,
  )
  @Field((type) => [UserOrganizationRole], { nullable: 'items' })
  public userRoles: UserOrganizationRole[];
}
