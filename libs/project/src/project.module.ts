import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectResolver } from '@app/project/graphql/resolvers/project.resolver';
import { Project } from '@app/project/entities/project.entity';
import { UserOrganizationRole } from '@app/project/entities/user-organization-role.entity';
import { UserProjectRole } from '@app/project/entities/user-project-role.entity';
import { ProjectRoleResolver } from '@app/project/graphql/resolvers/project-role.resolver';

@Module({
  providers: [ProjectService, ProjectResolver, ProjectRoleResolver],
  exports: [ProjectService],
  imports: [
    TypeOrmModule.forFeature([Project, UserProjectRole, UserOrganizationRole]),
  ],
})
export class ProjectModule {}
