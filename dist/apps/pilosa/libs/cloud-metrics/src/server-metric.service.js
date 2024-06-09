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
exports.ServerMetricService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const server_metric_entity_1 = require("./entities/server-metric.entity");
let ServerMetricService = class ServerMetricService {
    constructor(serverMetricRepository) {
        this.serverMetricRepository = serverMetricRepository;
    }
    async create(metricResult, serverInstance) {
        return this.serverMetricRepository.create({
            serverInstance: serverInstance,
            time: metricResult.datetime,
            cpu: metricResult.cpu,
            networkIn: metricResult.networkIn,
            networkOut: metricResult.networkOut,
            diskReadOps: metricResult.diskReadOps,
            diskWriteOps: metricResult.diskWriteOps,
        });
    }
    async getLastImportedDate(serverInstance) {
        const metric = await this.serverMetricRepository
            .createQueryBuilder('sm')
            .where('sm.serverInstance = :instanceId', {
            instanceId: serverInstance.id,
        })
            .orderBy('sm.time', 'DESC')
            .getOne();
        if (!metric) {
            return null;
        }
        return metric.time;
    }
    async save(serverMetric) {
        return this.serverMetricRepository.save(serverMetric);
    }
    findAllByServerInstance(serverInstance) {
        return this.serverMetricRepository
            .createQueryBuilder('sm')
            .where('sm.serverInstance = :instanceId', {
            instanceId: serverInstance.id,
        })
            .getMany();
    }
    async getMetricsByPeriod(serverInstance, timeBucket, start, end) {
        return this.serverMetricRepository.manager.query(`SELECT time_bucket($1, sm.time) AS period,
              COUNT(*),
              AVG(sm.cpu) AS cpu,
              AVG(sm."networkIn") AS networkIn,
              AVG(sm."networkOut") AS networkOut,
              AVG(sm."diskReadOps") AS diskReadOps,
              AVG(sm."diskWriteOps") AS diskWriteOps

       FROM server_metric sm

       WHERE sm."serverInstanceId" = $2
       AND sm.time > $3
        AND sm.time < $4

       GROUP BY period
       ORDER BY period DESC`, [timeBucket, serverInstance.id, start, end]);
    }
};
exports.ServerMetricService = ServerMetricService;
exports.ServerMetricService = ServerMetricService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(server_metric_entity_1.ServerMetric)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ServerMetricService);
//# sourceMappingURL=server-metric.service.js.map