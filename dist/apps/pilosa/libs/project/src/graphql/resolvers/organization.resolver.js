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
exports.OrganizationResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const current_user_decorator_1 = require("../../../../user/src/decorators/current-user.decorator");
const user_entity_1 = require("../../../../user/src/entities/user.entity");
const organization_entity_1 = require("../../entities/organization.entity");
const organization_service_1 = require("../../organization.service");
const project_entity_1 = require("../../entities/project.entity");
const project_service_1 = require("../../project.service");
let OrganizationResolver = class OrganizationResolver {
    constructor(organizationService, projectService) {
        this.organizationService = organizationService;
        this.projectService = projectService;
    }
    async organization(id, currentUser) {
        const project = await this.organizationService.findById(id, currentUser);
        if (!project) {
            throw new common_1.NotFoundException();
        }
        return project;
    }
    async projects(organization) {
        const project = await this.projectService.findAllByOrganization(organization);
        if (!project) {
            throw new common_1.NotFoundException();
        }
        return project;
    }
};
exports.OrganizationResolver = OrganizationResolver;
__decorate([
    (0, graphql_1.Query)(() => organization_entity_1.Organization),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "organization", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [project_entity_1.Project]),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [organization_entity_1.Organization]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "projects", null);
exports.OrganizationResolver = OrganizationResolver = __decorate([
    (0, graphql_1.Resolver)(() => organization_entity_1.Organization),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => organization_service_1.OrganizationService))),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => project_service_1.ProjectService))),
    __metadata("design:paramtypes", [organization_service_1.OrganizationService,
        project_service_1.ProjectService])
], OrganizationResolver);
//# sourceMappingURL=organization.resolver.js.map