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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const typeorm_1 = require("typeorm");
const frontend_app_entity_1 = require("../../../web-metrics/src/entities/frontend-app.entity");
const cloud_provider_account_entity_1 = require("../../../cloud/src/entities/cloud-provider-account.entity");
const organization_entity_1 = require("./organization.entity");
const user_project_role_entity_1 = require("./user-project-role.entity");
const graphql_1 = require("@nestjs/graphql");
let Project = class Project {
};
exports.Project = Project;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Project.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Project.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Project.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Project.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization, (organization) => organization.projects),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Project)
], Project.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_project_role_entity_1.UserProjectRole, (projectToUser) => projectToUser.project),
    (0, graphql_1.Field)(() => [user_project_role_entity_1.UserProjectRole], { nullable: 'items' }),
    __metadata("design:type", Array)
], Project.prototype, "userRoles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cloud_provider_account_entity_1.CloudProviderAccount, (cloudProviderAccount) => cloudProviderAccount.project),
    (0, graphql_1.Field)(() => [cloud_provider_account_entity_1.CloudProviderAccount], { nullable: 'items' }),
    __metadata("design:type", Array)
], Project.prototype, "cloudProviderAccounts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => frontend_app_entity_1.FrontendApp, (frontendApp) => frontendApp.project),
    (0, graphql_1.Field)(() => [frontend_app_entity_1.FrontendApp], { nullable: 'items' }),
    __metadata("design:type", Array)
], Project.prototype, "frontendApps", void 0);
exports.Project = Project = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], Project);
//# sourceMappingURL=project.entity.js.map