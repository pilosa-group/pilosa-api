import { BaseMetric } from './metric.base';

export interface BrowserMetric extends BaseMetric {
  domain: string;
  path: string;
  bytes: number;
  cachedBytes: number;
  accuracy: number;
}

export interface ServerMetric extends BaseMetric {
  cpu?: number;
  networkIn?: number;
  networkOut?: number;
}
