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
exports.MonitoringService = void 0;
const common_1 = require("@nestjs/common");
const server_instance_service_1 = require("./server-instance.service");
const cloud_provider_account_service_1 = require("./cloud-provider-account.service");
const aws_get_metrics_1 = require("../../cloud-aws/src/aws-get-metrics");
const aws_instance_list_1 = require("../../cloud-aws/src/aws-instance-list");
const server_metric_service_1 = require("../../cloud-metrics/src/server-metric.service");
const schedule_1 = require("@nestjs/schedule");
let MonitoringService = class MonitoringService {
    constructor(serverInstanceService, cloudProviderAccountService, serverMetricService) {
        this.serverInstanceService = serverInstanceService;
        this.cloudProviderAccountService = cloudProviderAccountService;
        this.serverMetricService = serverMetricService;
        this.isRunning = false;
    }
    async run() {
        if (this.isRunning) {
            return;
        }
        this.isRunning = true;
        const cloudProviderAccount = await this.cloudProviderAccountService.findOneLatestImported();
        if (cloudProviderAccount) {
            console.log('importing metrics for account', cloudProviderAccount.id);
            const awsCredentials = {
                accessKeyId: cloudProviderAccount.accessKeyId,
                secretAccessKey: cloudProviderAccount.secretAccessKey,
                region: cloudProviderAccount.region,
            };
            if (awsCredentials) {
                const instanceList = new aws_instance_list_1.AwsInstanceList();
                const instances = await instanceList.listInstances(awsCredentials);
                for (const instance of instances) {
                    const endTime = new Date();
                    const startTime = new Date(endTime);
                    startTime.setHours(startTime.getHours() - 2);
                    const serverInstance = await this.serverInstanceService.findOrCreateOneByInstanceId(instance, cloudProviderAccount);
                    const lastImportedAt = await this.serverMetricService.getLastImportedDate(serverInstance);
                    const metrics = new aws_get_metrics_1.AwsGetMetrics();
                    const instanceMetrics = await metrics.getMetrics(awsCredentials, instance, {
                        startTime,
                        endTime,
                    });
                    for (const metric of instanceMetrics) {
                        if (metric.datetime > lastImportedAt) {
                            const serverMetric = await this.serverMetricService.create(metric, serverInstance);
                            await this.serverMetricService.save(serverMetric);
                        }
                    }
                }
            }
            cloudProviderAccount.lastImportedAt = new Date();
            await this.cloudProviderAccountService.save(cloudProviderAccount);
        }
        this.isRunning = false;
    }
};
exports.MonitoringService = MonitoringService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_5_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MonitoringService.prototype, "run", null);
exports.MonitoringService = MonitoringService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [server_instance_service_1.ServerInstanceService,
        cloud_provider_account_service_1.CloudProviderAccountService,
        server_metric_service_1.ServerMetricService])
], MonitoringService);
//# sourceMappingURL=monitoring.service.js.map