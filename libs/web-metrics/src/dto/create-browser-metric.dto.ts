import { ColorScheme } from '@app/web-metrics/entities/browser-metric.entity';

export class CreateBrowserMetricDto {
  firstLoad: boolean;
  colorScheme: ColorScheme;
  bytesCompressed: number;
  bytesUncompressed: number;
  initiatorType: string;
  extension: string;
  domain: string;
  path: string;
  visitor: string;
  deviceType: string;
  device: string;
  os: string;
  browser: string;
  cpu: string;
}
