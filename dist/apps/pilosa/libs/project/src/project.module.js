"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModule = void 0;
const common_1 = require("@nestjs/common");
const user_project_role_service_1 = require("./user-project-role.service");
const typeorm_1 = require("@nestjs/typeorm");
const project_entity_1 = require("./entities/project.entity");
const user_organization_role_entity_1 = require("./entities/user-organization-role.entity");
const user_project_role_entity_1 = require("./entities/user-project-role.entity");
const project_role_resolver_1 = require("./graphql/resolvers/project-role.resolver");
const project_service_1 = require("./project.service");
const project_resolver_1 = require("./graphql/resolvers/project.resolver");
const user_organization_role_service_1 = require("./user-organization-role.service");
const organization_role_resolver_1 = require("./graphql/resolvers/organization-role.resolver");
const organization_resolver_1 = require("./graphql/resolvers/organization.resolver");
const organization_service_1 = require("./organization.service");
const organization_entity_1 = require("./entities/organization.entity");
const web_metrics_1 = require("../../web-metrics/src");
const cloud_1 = require("../../cloud/src");
let ProjectModule = class ProjectModule {
};
exports.ProjectModule = ProjectModule;
exports.ProjectModule = ProjectModule = __decorate([
    (0, common_1.Module)({
        providers: [
            user_project_role_service_1.UserProjectRoleService,
            user_organization_role_service_1.UserOrganizationRoleService,
            project_service_1.ProjectService,
            organization_service_1.OrganizationService,
            project_resolver_1.ProjectResolver,
            organization_resolver_1.OrganizationResolver,
            project_role_resolver_1.ProjectRoleResolver,
            organization_role_resolver_1.OrganizationRoleResolver,
        ],
        exports: [
            user_project_role_service_1.UserProjectRoleService,
            user_organization_role_service_1.UserOrganizationRoleService,
            project_service_1.ProjectService,
        ],
        imports: [
            web_metrics_1.WebMetricsModule,
            cloud_1.CloudModule,
            typeorm_1.TypeOrmModule.forFeature([
                project_entity_1.Project,
                organization_entity_1.Organization,
                user_project_role_entity_1.UserProjectRole,
                user_organization_role_entity_1.UserOrganizationRole,
            ]),
        ],
    })
], ProjectModule);
//# sourceMappingURL=project.module.js.map