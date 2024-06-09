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
exports.FrontendAppResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const frontend_app_entity_1 = require("../entities/frontend-app.entity");
const browser_metric_entity_1 = require("../entities/browser-metric.entity");
const browser_metric_service_1 = require("../browser-metric.service");
let FrontendAppResolver = class FrontendAppResolver {
    constructor(browserMetricService) {
        this.browserMetricService = browserMetricService;
    }
    async metrics(frontendApp) {
        return this.browserMetricService.findAllByFrontendApp(frontendApp);
    }
};
exports.FrontendAppResolver = FrontendAppResolver;
__decorate([
    (0, graphql_1.ResolveField)(() => [browser_metric_entity_1.BrowserMetric]),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [frontend_app_entity_1.FrontendApp]),
    __metadata("design:returntype", Promise)
], FrontendAppResolver.prototype, "metrics", null);
exports.FrontendAppResolver = FrontendAppResolver = __decorate([
    (0, graphql_1.Resolver)(() => frontend_app_entity_1.FrontendApp),
    __metadata("design:paramtypes", [browser_metric_service_1.BrowserMetricService])
], FrontendAppResolver);
//# sourceMappingURL=frontend-app.resolver.js.map