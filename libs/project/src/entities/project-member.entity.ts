import { Project } from '@app/project/entities/project.entity';
import { ProjectRole } from '@app/project/enum/project-role.enum';
import { User } from '@app/user/entities/user.entity';
import { Entity, Enum, ManyToOne, PrimaryKey } from '@mikro-orm/core';

@Entity({ tableName: 'project_member' })
export class ProjectMember {
  @PrimaryKey({ defaultRaw: 'gen_random_uuid()', type: 'uuid' })
  id: string;

  @ManyToOne({
    deleteRule: 'cascade',
    entity: () => Project,
  })
  public project: Project;

  @Enum(() => ProjectRole)
  role: ProjectRole = ProjectRole.MEMBER;

  @ManyToOne({
    deleteRule: 'cascade',
    entity: () => User,
  })
  public user: User;
}
