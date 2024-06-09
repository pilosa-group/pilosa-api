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
exports.CloudProviderAccount = void 0;
const typeorm_1 = require("typeorm");
const available_cloud_providers_1 = require("../available-cloud-providers");
const service_instance_entity_1 = require("./service-instance.entity");
const project_entity_1 = require("../../../project/src/entities/project.entity");
const graphql_1 = require("@nestjs/graphql");
const cloud_provider_enum_1 = require("../enum/cloud-provider.enum");
let CloudProviderAccount = class CloudProviderAccount {
    constructor() {
        this.provider = cloud_provider_enum_1.CloudProvider.AWS;
    }
};
exports.CloudProviderAccount = CloudProviderAccount;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], CloudProviderAccount.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CloudProviderAccount.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CloudProviderAccount.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], CloudProviderAccount.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-enum', {
        enum: available_cloud_providers_1.availableCloudProviders,
    }),
    (0, graphql_1.Field)(() => cloud_provider_enum_1.CloudProvider),
    __metadata("design:type", String)
], CloudProviderAccount.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', {
        nullable: true,
    }),
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], CloudProviderAccount.prototype, "lastImportedAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CloudProviderAccount.prototype, "accessKeyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CloudProviderAccount.prototype, "secretAccessKey", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CloudProviderAccount.prototype, "region", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, (project) => project.cloudProviderAccounts),
    (0, graphql_1.Field)(() => project_entity_1.Project),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", project_entity_1.Project)
], CloudProviderAccount.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => service_instance_entity_1.ServerInstance, (serverInstance) => serverInstance.cloudProviderAccount),
    (0, graphql_1.Field)(() => [service_instance_entity_1.ServerInstance], { nullable: 'items' }),
    __metadata("design:type", Array)
], CloudProviderAccount.prototype, "serverInstances", void 0);
exports.CloudProviderAccount = CloudProviderAccount = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], CloudProviderAccount);
//# sourceMappingURL=cloud-provider-account.entity.js.map