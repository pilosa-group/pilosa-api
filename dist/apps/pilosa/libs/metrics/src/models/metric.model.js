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
exports.UtilizationMetric = exports.TeadsAWSMetric = exports.Metric = void 0;
const graphql_1 = require("@nestjs/graphql");
let Metric = class Metric {
};
exports.Metric = Metric;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Metric.prototype, "period", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Metric.prototype, "name", void 0);
exports.Metric = Metric = __decorate([
    (0, graphql_1.InterfaceType)({
        isAbstract: true,
        resolveType(metric) {
            switch (metric.name) {
                case 'utilization':
                    return UtilizationMetric;
                case 'teads':
                    return TeadsAWSMetric;
                default:
                    return null;
            }
        },
    })
], Metric);
let TeadsAWSMetric = class TeadsAWSMetric extends Metric {
};
exports.TeadsAWSMetric = TeadsAWSMetric;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], TeadsAWSMetric.prototype, "energy", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], TeadsAWSMetric.prototype, "embodiedCarbon", void 0);
exports.TeadsAWSMetric = TeadsAWSMetric = __decorate([
    (0, graphql_1.ObjectType)({
        implements: [Metric],
    })
], TeadsAWSMetric);
let UtilizationMetric = class UtilizationMetric extends Metric {
};
exports.UtilizationMetric = UtilizationMetric;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], UtilizationMetric.prototype, "cpu", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], UtilizationMetric.prototype, "networkIn", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], UtilizationMetric.prototype, "networkOut", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], UtilizationMetric.prototype, "diskReadOps", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], UtilizationMetric.prototype, "diskWriteOps", void 0);
exports.UtilizationMetric = UtilizationMetric = __decorate([
    (0, graphql_1.ObjectType)({
        implements: [Metric],
    })
], UtilizationMetric);
//# sourceMappingURL=metric.model.js.map