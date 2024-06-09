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
exports.BrowserMetricsController = void 0;
const common_1 = require("@nestjs/common");
const browser_metric_service_1 = require("./browser-metric.service");
let BrowserMetricsController = class BrowserMetricsController {
    constructor(browserMetricsService) {
        this.browserMetricsService = browserMetricsService;
    }
    async getMetrics() {
        const endDate = new Date();
        const startDate = new Date(endDate);
        startDate.setHours(startDate.getHours() - 1);
        return this.browserMetricsService.getMetricsByPeriod();
    }
};
exports.BrowserMetricsController = BrowserMetricsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BrowserMetricsController.prototype, "getMetrics", null);
exports.BrowserMetricsController = BrowserMetricsController = __decorate([
    (0, common_1.Controller)('metrics/browser'),
    __metadata("design:paramtypes", [browser_metric_service_1.BrowserMetricService])
], BrowserMetricsController);
//# sourceMappingURL=browser-metrics.controller.js.map