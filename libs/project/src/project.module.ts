import { Module } from '@nestjs/common';
import { UserProjectRoleService } from './user-project-role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '@app/project/entities/project.entity';
import { UserOrganizationRole } from '@app/project/entities/user-organization-role.entity';
import { UserProjectRole } from '@app/project/entities/user-project-role.entity';
import { ProjectRoleResolver } from '@app/project/graphql/resolvers/project-role.resolver';
import { ProjectService } from '@app/project/project.service';
import { ProjectResolver } from '@app/project/graphql/resolvers/project.resolver';
import { UserOrganizationRoleService } from '@app/project/user-organization-role.service';
import { OrganizationRoleResolver } from '@app/project/graphql/resolvers/organization-role.resolver';
import { OrganizationResolver } from '@app/project/graphql/resolvers/organization.resolver';
import { OrganizationService } from '@app/project/organization.service';
import { Organization } from '@app/project/entities/organization.entity';
import { WebMetricsModule } from '@app/web-metrics';
import { CloudModule } from '@app/cloud';

@Module({
  providers: [
    UserProjectRoleService,
    UserOrganizationRoleService,
    ProjectService,
    OrganizationService,
    ProjectResolver,
    OrganizationResolver,
    ProjectRoleResolver,
    OrganizationRoleResolver,
  ],
  exports: [
    UserProjectRoleService,
    UserOrganizationRoleService,
    ProjectService,
  ],
  imports: [
    WebMetricsModule,
    CloudModule,
    TypeOrmModule.forFeature([
      Project,
      Organization,
      UserProjectRole,
      UserOrganizationRole,
    ]),
  ],
})
export class ProjectModule {}
