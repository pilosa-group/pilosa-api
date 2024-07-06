import {
  AwsCredentials,
  Instance,
} from '@app/cloud/cloud-provider-instance-list.interface';
import {
  CloudProviderMetrics,
  MetricResult,
} from '@app/cloud/cloud-provider-metrics.interface';
import { CloudWatch } from '@aws-sdk/client-cloudwatch';
import {
  GetMetricDataCommand,
  GetMetricDataCommandInput,
} from '@aws-sdk/client-cloudwatch';

const duration = 60;

export class AwsGetMetrics implements CloudProviderMetrics {
  async getMetrics(
    credentials: AwsCredentials,
    instance: Instance,
    { endTime, startTime },
  ): Promise<MetricResult[]> {
    const cloudWatchClient = new CloudWatch({
      apiVersion: '2010-08-01',
      credentials: {
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
      },
      region: credentials.region,
    });

    const input: GetMetricDataCommandInput = {
      EndTime: endTime,
      MetricDataQueries: [
        {
          Id: 'cpu', // Required
          MetricStat: {
            Metric: {
              // Required
              Dimensions: [
                {
                  Name: 'InstanceId', // Required
                  Value: instance.id,
                },
              ],
              MetricName: 'CPUUtilization', // Required
              Namespace: 'AWS/EC2', // Required
            },
            Period: duration, // Required
            Stat: 'Average', // Required
          },
          ReturnData: true,
        },
        {
          Id: 'networkOut', // Required
          MetricStat: {
            Metric: {
              // Required
              Dimensions: [
                {
                  Name: 'InstanceId', // Required
                  Value: instance.id,
                },
              ],
              MetricName: 'NetworkOut', // Required
              Namespace: 'AWS/EC2', // Required
            },
            Period: 60, // Required
            Stat: 'Average', // Required
          },
          ReturnData: true,
        },
        {
          Id: 'networkIn', // Required
          MetricStat: {
            Metric: {
              // Required
              Dimensions: [
                {
                  Name: 'InstanceId', // Required
                  Value: instance.id,
                },
              ],
              MetricName: 'NetworkIn', // Required
              Namespace: 'AWS/EC2', // Required
            },
            Period: 60, // Required
            Stat: 'Average', // Required
          },
          ReturnData: true,
        },
        {
          Id: 'diskReadOps', // Required
          MetricStat: {
            Metric: {
              // Required
              Dimensions: [
                {
                  Name: 'InstanceId', // Required
                  Value: instance.id,
                },
              ],
              MetricName: 'DiskReadOps', // Required
              Namespace: 'AWS/EC2', // Required
            },
            Period: 60, // Required
            Stat: 'Average', // Required
          },
          ReturnData: true,
        },
        {
          Id: 'diskWriteOps', // Required
          MetricStat: {
            Metric: {
              // Required
              Dimensions: [
                {
                  Name: 'InstanceId', // Required
                  Value: instance.id,
                },
              ],
              MetricName: 'DiskWriteOps', // Required
              Namespace: 'AWS/EC2', // Required
            },
            Period: 60, // Required
            Stat: 'Average', // Required
          },
          ReturnData: true,
        },
      ],
      ScanBy: 'TimestampAscending',
      StartTime: startTime,
    };

    const command = new GetMetricDataCommand(input);

    const response = await cloudWatchClient.send(command);

    const cpu = response?.MetricDataResults?.find(
      (result) => result.Id === 'cpu',
    );

    const networkOut = response?.MetricDataResults?.find(
      (result) => result.Id === 'networkOut',
    );

    const networkIn = response?.MetricDataResults?.find(
      (result) => result.Id === 'networkIn',
    );

    const diskReadOps = response?.MetricDataResults?.find(
      (result) => result.Id === 'diskReadOps',
    );

    const diskWriteOps = response?.MetricDataResults?.find(
      (result) => result.Id === 'diskWriteOps',
    );

    if (cpu) {
      const cpuTimestamps = cpu.Timestamps ?? [];
      const cpuValues = cpu.Values ?? [];
      const networkInValues = networkIn?.Values ?? [];
      const networkOutValues = networkOut?.Values ?? [];
      const diskReadOpsValues = diskReadOps?.Values ?? [];
      const diskWriteOpsValues = diskWriteOps?.Values ?? [];

      return cpuTimestamps.map((timestamp, index) => {
        return {
          cpu: cpuValues[index],
          datetime: timestamp,
          diskReadOps: diskReadOpsValues[index],
          diskWriteOps: diskWriteOpsValues[index],
          duration,
          networkIn: networkInValues[index],
          networkOut: networkOutValues[index],
        };
      });
    }

    return [];
  }
}
