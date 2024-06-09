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
exports.BrowserMetricCrossOrigin = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const frontend_app_entity_1 = require("./frontend-app.entity");
let BrowserMetricCrossOrigin = class BrowserMetricCrossOrigin {
};
exports.BrowserMetricCrossOrigin = BrowserMetricCrossOrigin;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], BrowserMetricCrossOrigin.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BrowserMetricCrossOrigin.prototype, "domain", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => frontend_app_entity_1.FrontendApp, (frontendApp) => frontendApp.crossOrigins),
    (0, typeorm_1.JoinColumn)(),
    (0, graphql_1.Field)(() => frontend_app_entity_1.FrontendApp),
    __metadata("design:type", frontend_app_entity_1.FrontendApp)
], BrowserMetricCrossOrigin.prototype, "frontendApp", void 0);
exports.BrowserMetricCrossOrigin = BrowserMetricCrossOrigin = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], BrowserMetricCrossOrigin);
//# sourceMappingURL=browser-metric-cross-origin.entity.js.map