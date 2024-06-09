"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsGetMetrics = void 0;
const client_cloudwatch_1 = require("@aws-sdk/client-cloudwatch");
const client_cloudwatch_2 = require("@aws-sdk/client-cloudwatch");
const duration = 60;
class AwsGetMetrics {
    async getMetrics(credentials, instance, { startTime, endTime }) {
        const cloudWatchClient = new client_cloudwatch_1.CloudWatch({
            apiVersion: '2010-08-01',
            region: credentials.region,
            credentials: {
                accessKeyId: credentials.accessKeyId,
                secretAccessKey: credentials.secretAccessKey,
            },
        });
        const input = {
            MetricDataQueries: [
                {
                    Id: 'cpu',
                    MetricStat: {
                        Metric: {
                            Dimensions: [
                                {
                                    Name: 'InstanceId',
                                    Value: instance.id,
                                },
                            ],
                            MetricName: 'CPUUtilization',
                            Namespace: 'AWS/EC2',
                        },
                        Period: duration,
                        Stat: 'Average',
                    },
                    ReturnData: true,
                },
                {
                    Id: 'networkOut',
                    MetricStat: {
                        Metric: {
                            Dimensions: [
                                {
                                    Name: 'InstanceId',
                                    Value: instance.id,
                                },
                            ],
                            MetricName: 'NetworkOut',
                            Namespace: 'AWS/EC2',
                        },
                        Period: 60,
                        Stat: 'Average',
                    },
                    ReturnData: true,
                },
                {
                    Id: 'networkIn',
                    MetricStat: {
                        Metric: {
                            Dimensions: [
                                {
                                    Name: 'InstanceId',
                                    Value: instance.id,
                                },
                            ],
                            MetricName: 'NetworkIn',
                            Namespace: 'AWS/EC2',
                        },
                        Period: 60,
                        Stat: 'Average',
                    },
                    ReturnData: true,
                },
                {
                    Id: 'diskReadOps',
                    MetricStat: {
                        Metric: {
                            Dimensions: [
                                {
                                    Name: 'InstanceId',
                                    Value: instance.id,
                                },
                            ],
                            MetricName: 'DiskReadOps',
                            Namespace: 'AWS/EC2',
                        },
                        Period: 60,
                        Stat: 'Average',
                    },
                    ReturnData: true,
                },
                {
                    Id: 'diskWriteOps',
                    MetricStat: {
                        Metric: {
                            Dimensions: [
                                {
                                    Name: 'InstanceId',
                                    Value: instance.id,
                                },
                            ],
                            MetricName: 'DiskWriteOps',
                            Namespace: 'AWS/EC2',
                        },
                        Period: 60,
                        Stat: 'Average',
                    },
                    ReturnData: true,
                },
            ],
            StartTime: startTime,
            EndTime: endTime,
            ScanBy: 'TimestampAscending',
        };
        const command = new client_cloudwatch_2.GetMetricDataCommand(input);
        const response = await cloudWatchClient.send(command);
        const cpu = response?.MetricDataResults?.find((result) => result.Id === 'cpu');
        const networkOut = response?.MetricDataResults?.find((result) => result.Id === 'networkOut');
        const networkIn = response?.MetricDataResults?.find((result) => result.Id === 'networkIn');
        const diskReadOps = response?.MetricDataResults?.find((result) => result.Id === 'diskReadOps');
        const diskWriteOps = response?.MetricDataResults?.find((result) => result.Id === 'diskWriteOps');
        if (cpu) {
            const cpuTimestamps = cpu.Timestamps ?? [];
            const cpuValues = cpu.Values ?? [];
            const networkInValues = networkIn?.Values ?? [];
            const networkOutValues = networkOut?.Values ?? [];
            const diskReadOpsValues = diskReadOps?.Values ?? [];
            const diskWriteOpsValues = diskWriteOps?.Values ?? [];
            return cpuTimestamps.map((timestamp, index) => {
                return {
                    duration,
                    datetime: timestamp,
                    cpu: cpuValues[index],
                    networkIn: networkInValues[index],
                    networkOut: networkOutValues[index],
                    diskReadOps: diskReadOpsValues[index],
                    diskWriteOps: diskWriteOpsValues[index],
                };
            });
        }
        return [];
    }
}
exports.AwsGetMetrics = AwsGetMetrics;
//# sourceMappingURL=aws-get-metrics.js.map