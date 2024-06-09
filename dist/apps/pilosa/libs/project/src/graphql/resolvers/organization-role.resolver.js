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
exports.OrganizationRoleResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const user_organization_role_entity_1 = require("../../entities/user-organization-role.entity");
const organization_service_1 = require("../../organization.service");
const organization_entity_1 = require("../../entities/organization.entity");
let OrganizationRoleResolver = class OrganizationRoleResolver {
    constructor(organizationService) {
        this.organizationService = organizationService;
    }
    async organization(organizationRole) {
        return this.organizationService.findByUserRole(organizationRole);
    }
};
exports.OrganizationRoleResolver = OrganizationRoleResolver;
__decorate([
    (0, graphql_1.ResolveField)(() => organization_entity_1.Organization),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_organization_role_entity_1.UserOrganizationRole]),
    __metadata("design:returntype", Promise)
], OrganizationRoleResolver.prototype, "organization", null);
exports.OrganizationRoleResolver = OrganizationRoleResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_organization_role_entity_1.UserOrganizationRole),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => organization_service_1.OrganizationService))),
    __metadata("design:paramtypes", [organization_service_1.OrganizationService])
], OrganizationRoleResolver);
//# sourceMappingURL=organization-role.resolver.js.map