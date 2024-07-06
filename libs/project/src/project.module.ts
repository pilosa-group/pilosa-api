import { ApiModule } from '@app/api';
import { CloudModule } from '@app/cloud';
import { OrganizationsController } from '@app/project/controllers/organizations.controller';
import { ProjectsController } from '@app/project/controllers/projects.controller';
import { Organization } from '@app/project/entities/organization.entity';
import { Project } from '@app/project/entities/project.entity';
import { UserOrganizationRole } from '@app/project/entities/user-organization-role.entity';
import { UserProjectRole } from '@app/project/entities/user-project-role.entity';
import { OrganizationService } from '@app/project/organization.service';
import { ProjectService } from '@app/project/project.service';
import { UserOrganizationRoleService } from '@app/project/user-organization-role.service';
import { WebMetricsModule } from '@app/web-metrics';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { UserProjectRoleService } from './user-project-role.service';

@Module({
  controllers: [OrganizationsController, ProjectsController],
  exports: [
    UserProjectRoleService,
    UserOrganizationRoleService,
    ProjectService,
  ],
  imports: [
    WebMetricsModule,
    CloudModule,
    ApiModule,
    MikroOrmModule.forFeature([
      Project,
      Organization,
      UserProjectRole,
      UserOrganizationRole,
    ]),
  ],
  providers: [
    UserProjectRoleService,
    UserOrganizationRoleService,
    ProjectService,
    OrganizationService,
  ],
})
export class ProjectModule {}
