import { Module } from '@nestjs/common';
import { UserProjectRoleService } from './user-project-role.service';
import { Project } from '@app/project/entities/project.entity';
import { UserOrganizationRole } from '@app/project/entities/user-organization-role.entity';
import { UserProjectRole } from '@app/project/entities/user-project-role.entity';
import { ProjectService } from '@app/project/project.service';
import { UserOrganizationRoleService } from '@app/project/user-organization-role.service';
import { OrganizationService } from '@app/project/organization.service';
import { WebMetricsModule } from '@app/web-metrics';
import { CloudModule } from '@app/cloud';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Organization } from '@app/project/entities/organization.entity';

@Module({
  providers: [
    UserProjectRoleService,
    UserOrganizationRoleService,
    ProjectService,
    OrganizationService,
  ],
  exports: [
    UserProjectRoleService,
    UserOrganizationRoleService,
    ProjectService,
  ],
  imports: [
    WebMetricsModule,
    CloudModule,
    MikroOrmModule.forFeature([
      Project,
      Organization,
      UserProjectRole,
      UserOrganizationRole,
    ]),
  ],
})
export class ProjectModule {}
