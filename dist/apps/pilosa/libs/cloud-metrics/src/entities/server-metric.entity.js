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
exports.ServerMetric = void 0;
const typeorm_1 = require("typeorm");
const service_instance_entity_1 = require("../../../cloud/src/entities/service-instance.entity");
const graphql_1 = require("@nestjs/graphql");
let ServerMetric = class ServerMetric {
};
exports.ServerMetric = ServerMetric;
__decorate([
    (0, typeorm_1.PrimaryColumn)('timestamptz', {
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], ServerMetric.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], ServerMetric.prototype, "cpu", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { nullable: true }),
    __metadata("design:type", Number)
], ServerMetric.prototype, "networkIn", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { nullable: true }),
    __metadata("design:type", Number)
], ServerMetric.prototype, "networkOut", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { nullable: true }),
    __metadata("design:type", Number)
], ServerMetric.prototype, "diskReadOps", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { nullable: true }),
    __metadata("design:type", Number)
], ServerMetric.prototype, "diskWriteOps", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_instance_entity_1.ServerInstance, (serverInstance) => serverInstance.metrics),
    (0, typeorm_1.JoinColumn)(),
    (0, graphql_1.Field)(() => [service_instance_entity_1.ServerInstance], { nullable: 'items' }),
    __metadata("design:type", service_instance_entity_1.ServerInstance)
], ServerMetric.prototype, "serverInstance", void 0);
exports.ServerMetric = ServerMetric = __decorate([
    (0, typeorm_1.Entity)()
], ServerMetric);
//# sourceMappingURL=server-metric.entity.js.map