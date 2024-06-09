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
exports.BrowserMetricService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const browser_metric_entity_1 = require("./entities/browser-metric.entity");
let BrowserMetricService = class BrowserMetricService {
    constructor(browserMetricRepository) {
        this.browserMetricRepository = browserMetricRepository;
    }
    async create(browserMetricDto, frontendApp) {
        return this.browserMetricRepository.create({
            frontendApp: frontendApp,
            ...browserMetricDto,
        });
    }
    async save(browserMetric) {
        return this.browserMetricRepository.save(browserMetric);
    }
    async findAllByFrontendApp(frontendApp) {
        return this.browserMetricRepository
            .createQueryBuilder('bm')
            .where('bm.frontendAppId = :frontendAppId', {
            frontendAppId: frontendApp.id,
        })
            .getMany();
    }
    async getMetricsByPeriod() {
        return this.browserMetricRepository.manager
            .query(`SELECT time_bucket('1 minutes', time) AS bucket,

     COUNT(*),
     AVG(bytes) AS bytes,
       AVG("bytesCached") AS bytesCached,
       AVG("accuracy") AS accuracy
    
     FROM browser_metric
     
     GROUP BY bucket
     ORDER BY bucket DESC`);
    }
};
exports.BrowserMetricService = BrowserMetricService;
exports.BrowserMetricService = BrowserMetricService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(browser_metric_entity_1.BrowserMetric)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BrowserMetricService);
//# sourceMappingURL=browser-metric.service.js.map