import {
  Instance,
  AwsCredentials,
} from './cloud-provider-instance-list.interface';

export type MetricResult = {
  datetime: Date;
  duration: number;
  cpu?: number;
  networkIn?: number;
  networkOut?: number;
};

interface GetMetricsOptions {
  startTime: Date;
  endTime: Date;
}

export interface CloudProviderMetrics {
  getMetrics(
    credentials: AwsCredentials,
    instance: Instance,
    options: GetMetricsOptions,
  ): Promise<MetricResult[]>;
}
