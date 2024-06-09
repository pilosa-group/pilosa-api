"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudModule = void 0;
const common_1 = require("@nestjs/common");
const monitoring_service_1 = require("./monitoring.service");
const server_instance_service_1 = require("./server-instance.service");
const typeorm_1 = require("@nestjs/typeorm");
const cloud_provider_account_service_1 = require("./cloud-provider-account.service");
const servers_controller_1 = require("./servers.controller");
const cloud_metrics_1 = require("../../cloud-metrics/src");
const cloud_provider_account_entity_1 = require("./entities/cloud-provider-account.entity");
const service_instance_entity_1 = require("./entities/service-instance.entity");
const schedule_1 = require("@nestjs/schedule");
const graphql_1 = require("@nestjs/graphql");
const cloud_provider_enum_1 = require("./enum/cloud-provider.enum");
const cloud_provider_account_resolver_1 = require("./graphql/resolvers/cloud-provider-account.resolver");
const server_instance_resolver_1 = require("./graphql/resolvers/server-instance.resolver");
const metric_period_enum_1 = require("./enum/metric-period.enum");
(0, graphql_1.registerEnumType)(cloud_provider_enum_1.CloudProvider, {
    name: 'CloudProvider',
});
(0, graphql_1.registerEnumType)(metric_period_enum_1.MetricPeriod, {
    name: 'MetricPeriod',
});
let CloudModule = class CloudModule {
};
exports.CloudModule = CloudModule;
exports.CloudModule = CloudModule = __decorate([
    (0, common_1.Module)({
        controllers: [servers_controller_1.ServersController],
        providers: [
            monitoring_service_1.MonitoringService,
            server_instance_service_1.ServerInstanceService,
            cloud_provider_account_service_1.CloudProviderAccountService,
            cloud_provider_account_resolver_1.CloudProviderAccountResolver,
            server_instance_resolver_1.ServerInstanceResolver,
        ],
        imports: [
            cloud_metrics_1.CloudMetricsModule,
            typeorm_1.TypeOrmModule.forFeature([cloud_provider_account_entity_1.CloudProviderAccount, service_instance_entity_1.ServerInstance]),
            schedule_1.ScheduleModule.forRoot(),
        ],
        exports: [cloud_provider_account_service_1.CloudProviderAccountService],
    })
], CloudModule);
//# sourceMappingURL=cloud.module.js.map