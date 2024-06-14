import {
  Entity,
  Property,
  ManyToOne,
  PrimaryKey,
  ArrayType,
} from '@mikro-orm/core';
import { Project } from '@app/project/entities/project.entity';
import { ObjectType } from '@nestjs/graphql';
import { User } from '@app/user/entities/user.entity';

@Entity({ tableName: 'project_to_user' })
@ObjectType()
export class UserProjectRole {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property({ type: ArrayType })
  roles: string[];

  @ManyToOne({
    entity: () => Project,
  })
  public project: Project;

  @ManyToOne({
    entity: () => User,
  })
  public user: User;
}
