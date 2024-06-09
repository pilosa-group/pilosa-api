"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_project_role_service_1 = require("../../../project/src/user-project-role.service");
const user_entity_1 = require("../entities/user.entity");
const user_project_role_entity_1 = require("../../../project/src/entities/user-project-role.entity");
const project_entity_1 = require("../../../project/src/entities/project.entity");
const project_service_1 = require("../../../project/src/project.service");
const current_user_decorator_1 = require("../decorators/current-user.decorator");
const common_1 = require("@nestjs/common");
const user_organization_role_entity_1 = require("../../../project/src/entities/user-organization-role.entity");
const user_organization_role_service_1 = require("../../../project/src/user-organization-role.service");
let UserResolver = class UserResolver {
    constructor(projectService, userProjectRoleService, userOrganizationRoleService) {
        this.projectService = projectService;
        this.userProjectRoleService = userProjectRoleService;
        this.userOrganizationRoleService = userOrganizationRoleService;
    }
    async projectRoles(user) {
        return this.userProjectRoleService.findAllForUser(user);
    }
    async project(id, currentUser) {
        const project = await this.projectService.findById(id, currentUser);
        if (!project) {
            throw new common_1.NotFoundException();
        }
        return project;
    }
    async organizationRoles(user) {
        return this.userOrganizationRoleService.findAllForUser(user);
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, graphql_1.ResolveField)(() => [user_project_role_entity_1.UserProjectRole], { nullable: 'items' }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "projectRoles", null);
__decorate([
    (0, graphql_1.ResolveField)(() => project_entity_1.Project),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "project", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [user_organization_role_entity_1.UserOrganizationRole], { nullable: 'items' }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "organizationRoles", null);
exports.UserResolver = UserResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_entity_1.User),
    __metadata("design:paramtypes", [project_service_1.ProjectService,
        user_project_role_service_1.UserProjectRoleService,
        user_organization_role_service_1.UserOrganizationRoleService])
], UserResolver);
//# sourceMappingURL=user.resolver.js.map