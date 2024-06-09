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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const user_organization_role_entity_1 = require("../../../project/src/entities/user-organization-role.entity");
const user_project_role_entity_1 = require("../../../project/src/entities/user-project-role.entity");
const graphql_1 = require("@nestjs/graphql");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { unique: true }),
    __metadata("design:type", String)
], User.prototype, "clerkId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_organization_role_entity_1.UserOrganizationRole, (organizationToUser) => organizationToUser.user),
    (0, graphql_1.Field)(() => [user_organization_role_entity_1.UserOrganizationRole], { nullable: 'items' }),
    __metadata("design:type", Array)
], User.prototype, "organizationRoles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_project_role_entity_1.UserProjectRole, (projectToUser) => projectToUser.user),
    (0, graphql_1.Field)(() => [user_project_role_entity_1.UserProjectRole], { nullable: 'items' }),
    __metadata("design:type", Array)
], User.prototype, "projectRoles", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], User);
//# sourceMappingURL=user.entity.js.map