import { Project } from '@app/project/entities/project.entity';
import { User } from '@app/user/entities/user.entity';
import {
  ArrayType,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

@Entity({ tableName: 'project_to_user' })
export class UserProjectRole {
  @PrimaryKey({ defaultRaw: 'gen_random_uuid()', type: 'uuid' })
  id: string;

  @ManyToOne({
    deleteRule: 'cascade',
    entity: () => Project,
  })
  public project: Project;

  @Property({ type: ArrayType })
  roles: string[];

  @ManyToOne({
    deleteRule: 'cascade',
    entity: () => User,
  })
  public user: User;
}
