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
exports.ProjectRoleResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const project_entity_1 = require("../../entities/project.entity");
const user_project_role_entity_1 = require("../../entities/user-project-role.entity");
const project_service_1 = require("../../project.service");
let ProjectRoleResolver = class ProjectRoleResolver {
    constructor(projectService) {
        this.projectService = projectService;
    }
    async project(projectRole) {
        return this.projectService.findByUserRole(projectRole);
    }
};
exports.ProjectRoleResolver = ProjectRoleResolver;
__decorate([
    (0, graphql_1.ResolveField)(() => project_entity_1.Project),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_project_role_entity_1.UserProjectRole]),
    __metadata("design:returntype", Promise)
], ProjectRoleResolver.prototype, "project", null);
exports.ProjectRoleResolver = ProjectRoleResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_project_role_entity_1.UserProjectRole),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => project_service_1.ProjectService))),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectRoleResolver);
//# sourceMappingURL=project-role.resolver.js.map