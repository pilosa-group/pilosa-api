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
exports.ServerInstance = void 0;
const typeorm_1 = require("typeorm");
const cloud_provider_account_entity_1 = require("./cloud-provider-account.entity");
const server_metric_entity_1 = require("../../../cloud-metrics/src/entities/server-metric.entity");
const graphql_1 = require("@nestjs/graphql");
const metric_model_1 = require("../../../metrics/src/models/metric.model");
let ServerInstanceTag = class ServerInstanceTag {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ServerInstanceTag.prototype, "key", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ServerInstanceTag.prototype, "value", void 0);
ServerInstanceTag = __decorate([
    (0, graphql_1.ObjectType)()
], ServerInstanceTag);
let ServerInstance = class ServerInstance {
    constructor() {
        this.tags = [];
    }
};
exports.ServerInstance = ServerInstance;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], ServerInstance.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ServerInstance.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ServerInstance.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], ServerInstance.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ServerInstance.prototype, "class", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ServerInstance.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ServerInstance.prototype, "instanceId", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-json'),
    (0, graphql_1.Field)(() => [ServerInstanceTag], { nullable: 'items' }),
    __metadata("design:type", Array)
], ServerInstance.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cloud_provider_account_entity_1.CloudProviderAccount, (cloudProviderAccount) => cloudProviderAccount.serverInstances),
    (0, typeorm_1.JoinColumn)(),
    (0, graphql_1.Field)(() => [cloud_provider_account_entity_1.CloudProviderAccount], { nullable: 'items' }),
    __metadata("design:type", cloud_provider_account_entity_1.CloudProviderAccount)
], ServerInstance.prototype, "cloudProviderAccount", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => server_metric_entity_1.ServerMetric, (metric) => metric.serverInstance),
    (0, graphql_1.Field)(() => [metric_model_1.Metric], { nullable: 'items' }),
    __metadata("design:type", Array)
], ServerInstance.prototype, "metrics", void 0);
exports.ServerInstance = ServerInstance = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], ServerInstance);
//# sourceMappingURL=service-instance.entity.js.map