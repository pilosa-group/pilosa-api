import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '@app/project';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '@app/user/entities/user.entity';

@Entity({ name: 'project_to_user' })
@ObjectType()
export class UserProjectRole {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  public id: number;

  @Column()
  public projectId: string;

  @Column()
  public userId: string;

  @Column()
  @Field()
  public role: string;

  @ManyToOne(() => Project, (project) => project.userRoles)
  @Field((type) => Project)
  public project: Project;

  @ManyToOne(() => User, (user) => user.projectRoles)
  @Field((type) => User)
  public user: User;
}
