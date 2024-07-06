import {
  AwsCredentials,
  Instance,
} from './cloud-provider-instance-list.interface';

export type MetricResult = {
  cpu?: number;
  datetime: Date;
  diskReadOps?: number;
  diskWriteOps?: number;
  duration: number;
  networkIn?: number;
  networkOut?: number;
};

interface GetMetricsOptions {
  endTime: Date;
  startTime: Date;
}

export interface CloudProviderMetrics {
  getMetrics(
    credentials: AwsCredentials,
    instance: Instance,
    options: GetMetricsOptions,
  ): Promise<MetricResult[]>;
}
