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
exports.UserOrganizationRole = void 0;
const typeorm_1 = require("typeorm");
const organization_entity_1 = require("./organization.entity");
const user_entity_1 = require("../../../user/src/entities/user.entity");
const graphql_1 = require("@nestjs/graphql");
const type_1 = require("graphql/type");
let UserOrganizationRole = class UserOrganizationRole {
};
exports.UserOrganizationRole = UserOrganizationRole;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], UserOrganizationRole.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserOrganizationRole.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserOrganizationRole.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array'),
    (0, graphql_1.Field)(() => [type_1.GraphQLString]),
    __metadata("design:type", Array)
], UserOrganizationRole.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization, (organization) => organization.userRoles),
    (0, graphql_1.Field)(() => organization_entity_1.Organization),
    __metadata("design:type", organization_entity_1.Organization)
], UserOrganizationRole.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.organizationRoles),
    (0, graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], UserOrganizationRole.prototype, "user", void 0);
exports.UserOrganizationRole = UserOrganizationRole = __decorate([
    (0, typeorm_1.Entity)({ name: 'organization_to_user' }),
    (0, graphql_1.ObjectType)()
], UserOrganizationRole);
//# sourceMappingURL=user-organization-role.entity.js.map