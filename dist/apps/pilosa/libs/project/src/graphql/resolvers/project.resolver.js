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
exports.ProjectResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const project_entity_1 = require("../../entities/project.entity");
const project_service_1 = require("../../project.service");
const current_user_decorator_1 = require("../../../../user/src/decorators/current-user.decorator");
const user_entity_1 = require("../../../../user/src/entities/user.entity");
const frontend_app_entity_1 = require("../../../../web-metrics/src/entities/frontend-app.entity");
const frontend_app_service_1 = require("../../../../web-metrics/src/frontend-app.service");
const cloud_provider_account_entity_1 = require("../../../../cloud/src/entities/cloud-provider-account.entity");
const cloud_provider_account_service_1 = require("../../../../cloud/src/cloud-provider-account.service");
let ProjectResolver = class ProjectResolver {
    constructor(projectService, frontendAppService, cloudProviderAccountService) {
        this.projectService = projectService;
        this.frontendAppService = frontendAppService;
        this.cloudProviderAccountService = cloudProviderAccountService;
    }
    async project(id, currentUser) {
        const project = await this.projectService.findById(id, currentUser);
        if (!project) {
            throw new common_1.NotFoundException();
        }
        return project;
    }
    async frontendApps(project) {
        return this.frontendAppService.findAllByProject(project);
    }
    async cloudProviderAccounts(project) {
        return this.cloudProviderAccountService.findAllByProject(project);
    }
};
exports.ProjectResolver = ProjectResolver;
__decorate([
    (0, graphql_1.Query)(() => project_entity_1.Project),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "project", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [frontend_app_entity_1.FrontendApp]),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_entity_1.Project]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "frontendApps", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [cloud_provider_account_entity_1.CloudProviderAccount]),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_entity_1.Project]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "cloudProviderAccounts", null);
exports.ProjectResolver = ProjectResolver = __decorate([
    (0, graphql_1.Resolver)(() => project_entity_1.Project),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => project_service_1.ProjectService))),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => frontend_app_service_1.FrontendAppService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => cloud_provider_account_service_1.CloudProviderAccountService))),
    __metadata("design:paramtypes", [project_service_1.ProjectService,
        frontend_app_service_1.FrontendAppService,
        cloud_provider_account_service_1.CloudProviderAccountService])
], ProjectResolver);
//# sourceMappingURL=project.resolver.js.map