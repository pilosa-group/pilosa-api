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
exports.FrontendApp = void 0;
const typeorm_1 = require("typeorm");
const browser_metric_entity_1 = require("./browser-metric.entity");
const project_entity_1 = require("../../../project/src/entities/project.entity");
const graphql_1 = require("@nestjs/graphql");
const type_1 = require("graphql/type");
const browser_metric_cross_origin_entity_1 = require("./browser-metric-cross-origin.entity");
let FrontendApp = class FrontendApp {
};
exports.FrontendApp = FrontendApp;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], FrontendApp.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], FrontendApp.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], FrontendApp.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], FrontendApp.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], FrontendApp.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array'),
    (0, graphql_1.Field)(() => [type_1.GraphQLString]),
    __metadata("design:type", Array)
], FrontendApp.prototype, "urls", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, (project) => project.frontendApps),
    (0, typeorm_1.JoinColumn)(),
    (0, graphql_1.Field)(() => project_entity_1.Project),
    __metadata("design:type", project_entity_1.Project)
], FrontendApp.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => browser_metric_entity_1.BrowserMetric, (metric) => metric.frontendApp),
    (0, graphql_1.Field)(() => [browser_metric_entity_1.BrowserMetric], { nullable: 'items' }),
    __metadata("design:type", Array)
], FrontendApp.prototype, "metrics", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => browser_metric_cross_origin_entity_1.BrowserMetricCrossOrigin, (crossOrigin) => crossOrigin.frontendApp),
    (0, graphql_1.Field)(() => [browser_metric_entity_1.BrowserMetric], { nullable: 'items' }),
    __metadata("design:type", Array)
], FrontendApp.prototype, "crossOrigins", void 0);
exports.FrontendApp = FrontendApp = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], FrontendApp);
//# sourceMappingURL=frontend-app.entity.js.map