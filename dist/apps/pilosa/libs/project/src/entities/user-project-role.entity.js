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
exports.UserProjectRole = void 0;
const typeorm_1 = require("typeorm");
const project_entity_1 = require("./project.entity");
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("../../../user/src/entities/user.entity");
const type_1 = require("graphql/type");
let UserProjectRole = class UserProjectRole {
};
exports.UserProjectRole = UserProjectRole;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", Number)
], UserProjectRole.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserProjectRole.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserProjectRole.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array'),
    (0, graphql_1.Field)(() => [type_1.GraphQLString]),
    __metadata("design:type", Array)
], UserProjectRole.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, (project) => project.userRoles),
    (0, graphql_1.Field)(() => project_entity_1.Project),
    __metadata("design:type", project_entity_1.Project)
], UserProjectRole.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.projectRoles),
    (0, graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], UserProjectRole.prototype, "user", void 0);
exports.UserProjectRole = UserProjectRole = __decorate([
    (0, typeorm_1.Entity)({ name: 'project_to_user' }),
    (0, graphql_1.ObjectType)()
], UserProjectRole);
//# sourceMappingURL=user-project-role.entity.js.map