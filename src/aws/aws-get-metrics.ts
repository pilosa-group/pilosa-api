import { CloudWatch } from '@aws-sdk/client-cloudwatch';

import {
  Instance,
  AwsCredentials,
} from '../cloud/cloud-provider-instance-list.interface';
import {
  CloudProviderMetrics,
  MetricResult,
} from '../cloud/cloud-provider-metrics.interface';
import {
  GetMetricDataCommand,
  GetMetricDataCommandInput,
} from '@aws-sdk/client-cloudwatch';

const duration = 60;

export class AwsGetMetrics implements CloudProviderMetrics {
  async getMetrics(
    credentials: AwsCredentials,
    instance: Instance,
    { startTime, endTime },
  ): Promise<MetricResult[]> {
    const cloudWatchClient = new CloudWatch({
      apiVersion: '2010-08-01',
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
      },
    });

    const input: GetMetricDataCommandInput = {
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
        // {
        //   Id: "networkOut", // Required
        //   MetricStat: {
        //     Metric: {
        //       // Required
        //       Dimensions: [
        //         {
        //           Name: "InstanceId", // Required
        //           Value: instance.id,
        //         },
        //       ],
        //       MetricName: "NetworkOut", // Required
        //       Namespace: "AWS/EC2", // Required
        //     },
        //     Period: 60, // Required
        //     Stat: "Average", // Required
        //   },
        //   ReturnData: true,
        // },
        // {
        //   Id: "networkIn", // Required
        //   MetricStat: {
        //     Metric: {
        //       // Required
        //       Dimensions: [
        //         {
        //           Name: "InstanceId", // Required
        //           Value: instance.id,
        //         },
        //       ],
        //       MetricName: "NetworkIn", // Required
        //       Namespace: "AWS/EC2", // Required
        //     },
        //     Period: 60, // Required
        //     Stat: "Average", // Required
        //   },
        //   ReturnData: true,
        // },
      ],
      StartTime: startTime,
      EndTime: endTime,
      ScanBy: 'TimestampAscending',
    };

    const command = new GetMetricDataCommand(input);

    const response = await cloudWatchClient.send(command);

    // console.log(JSON.stringify(response, null, 2));

    const cpu = response?.MetricDataResults?.find(
      (result) => result.Id === 'cpu',
    );

    if (cpu) {
      const timestamps = cpu.Timestamps ?? [];
      const values = cpu.Values ?? [];

      return timestamps.map((timestamp, index) => {
        return {
          duration,
          datetime: timestamp,
          cpu: values[index],
        };
      });
    }

    return [];
  }
}
