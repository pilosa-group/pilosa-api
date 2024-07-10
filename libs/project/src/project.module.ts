import { ApiModule } from '@app/api';
import { CloudModule } from '@app/cloud';
import { OrganizationMembersController } from '@app/project/controllers/organization-members.controller';
import { OrganizationsController } from '@app/project/controllers/organizations.controller';
import { ProjectMembersController } from '@app/project/controllers/project-members.controller';
import { ProjectsController } from '@app/project/controllers/projects.controller';
import { Organization } from '@app/project/entities/organization.entity';
import { OrganizationMember } from '@app/project/entities/organization-member.entity';
import { Project } from '@app/project/entities/project.entity';
import { ProjectMember } from '@app/project/entities/project-member.entity';
import { OrganizationService } from '@app/project/organization.service';
import { OrganizationMemberService } from '@app/project/organization-member.service';
import { ProjectService } from '@app/project/project.service';
import { WebMetricsModule } from '@app/web-metrics';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { ProjectMemberService } from './project-member.service';

@Module({
  controllers: [
    OrganizationsController,
    ProjectsController,
    ProjectMembersController,
    OrganizationMembersController,
  ],
  exports: [ProjectMemberService, OrganizationMemberService, ProjectService],
  imports: [
    WebMetricsModule,
    CloudModule,
    ApiModule,
    MikroOrmModule.forFeature([
      Project,
      Organization,
      ProjectMember,
      OrganizationMember,
    ]),
  ],
  providers: [
    ProjectMemberService,
    OrganizationMemberService,
    ProjectService,
    OrganizationService,
  ],
})
export class ProjectModule {}
