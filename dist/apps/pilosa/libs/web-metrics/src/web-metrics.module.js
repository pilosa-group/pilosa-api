"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebMetricsModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const beacon_controller_1 = require("./beacon.controller");
const frontend_app_service_1 = require("./frontend-app.service");
const browser_metric_service_1 = require("./browser-metric.service");
const browser_metric_entity_1 = require("./entities/browser-metric.entity");
const frontend_app_entity_1 = require("./entities/frontend-app.entity");
const browser_metrics_controller_1 = require("./browser-metrics.controller");
const frontend_app_resolver_1 = require("./graphql/frontend-app.resolver");
let WebMetricsModule = class WebMetricsModule {
};
exports.WebMetricsModule = WebMetricsModule;
exports.WebMetricsModule = WebMetricsModule = __decorate([
    (0, common_1.Module)({
        controllers: [beacon_controller_1.BeaconController, browser_metrics_controller_1.BrowserMetricsController],
        providers: [frontend_app_service_1.FrontendAppService, browser_metric_service_1.BrowserMetricService, frontend_app_resolver_1.FrontendAppResolver],
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([browser_metric_entity_1.BrowserMetric, frontend_app_entity_1.FrontendApp]),
        ],
        exports: [frontend_app_service_1.FrontendAppService, browser_metric_service_1.BrowserMetricService],
    })
], WebMetricsModule);
//# sourceMappingURL=web-metrics.module.js.map