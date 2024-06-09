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
exports.ServerInstanceResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const service_instance_entity_1 = require("../../entities/service-instance.entity");
const server_metric_service_1 = require("../../../../cloud-metrics/src/server-metric.service");
const common_1 = require("@nestjs/common");
const server_instance_service_1 = require("../../server-instance.service");
const metric_period_enum_1 = require("../../enum/metric-period.enum");
const type_1 = require("graphql/type");
const if_unofficial_plugins_1 = require("@grnsft/if-unofficial-plugins");
const metric_model_1 = require("../../../../metrics/src/models/metric.model");
let GetMetricsArgs = class GetMetricsArgs {
};
__decorate([
    (0, graphql_1.Field)(() => metric_period_enum_1.MetricPeriod),
    __metadata("design:type", String)
], GetMetricsArgs.prototype, "period", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], GetMetricsArgs.prototype, "startDate", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], GetMetricsArgs.prototype, "endDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => [type_1.GraphQLString]),
    __metadata("design:type", Array)
], GetMetricsArgs.prototype, "models", void 0);
GetMetricsArgs = __decorate([
    (0, graphql_1.ArgsType)()
], GetMetricsArgs);
let ServerInstanceResolver = class ServerInstanceResolver {
    constructor(serverInstanceService, serverMetricService) {
        this.serverInstanceService = serverInstanceService;
        this.serverMetricService = serverMetricService;
    }
    async serverInstance(id) {
        const serverInstance = await this.serverInstanceService.findOneById(id);
        if (!serverInstance) {
            throw new common_1.NotFoundException();
        }
        return serverInstance;
    }
    async metrics(serverInstance, args) {
        const serverMetrics = await this.serverMetricService.getMetricsByPeriod(serverInstance, args.period, args.startDate, args.endDate);
        const metrics = [];
        for (const model of args.models) {
            switch (model) {
                case 'utilization':
                    metrics.push(...serverMetrics.map((serverMetric) => ({
                        name: model,
                        ...serverMetric,
                    })));
                    break;
                case 'teads':
                    const teads = (0, if_unofficial_plugins_1.TeadsAWS)({});
                    const teadsMetrics = await teads.execute(serverMetrics.map((serverMetric) => ({
                        name: model,
                        period: serverMetric.period,
                        duration: (0, metric_period_enum_1.periodToMilliseconds)(args.period),
                        timestamp: serverMetric.period,
                        'cloud/instance-type': serverInstance.class,
                        'cpu/utilization': serverMetric.cpu,
                    })));
                    metrics.push(...teadsMetrics.map((metric) => ({
                        ...metric,
                        embodiedCarbon: metric['carbon-embodied'],
                    })));
                    break;
                default:
                    break;
            }
        }
        return metrics;
    }
};
exports.ServerInstanceResolver = ServerInstanceResolver;
__decorate([
    (0, graphql_1.Query)(() => service_instance_entity_1.ServerInstance),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServerInstanceResolver.prototype, "serverInstance", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [metric_model_1.Metric]),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [service_instance_entity_1.ServerInstance,
        GetMetricsArgs]),
    __metadata("design:returntype", Promise)
], ServerInstanceResolver.prototype, "metrics", null);
exports.ServerInstanceResolver = ServerInstanceResolver = __decorate([
    (0, graphql_1.Resolver)(() => service_instance_entity_1.ServerInstance),
    __metadata("design:paramtypes", [server_instance_service_1.ServerInstanceService,
        server_metric_service_1.ServerMetricService])
], ServerInstanceResolver);
//# sourceMappingURL=server-instance.resolver.js.map