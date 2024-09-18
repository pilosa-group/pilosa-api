import { ColorScheme } from '@app/web-metrics/entities/browser-metric.entity';

export class CreateBrowserMetricDto {
  browser: string;
  bytesCompressed: number;
  bytesUncompressed: number;
  colorScheme: ColorScheme;
  cpu: string;
  device: string;
  deviceType: string;
  domain: string;
  extension: string;
  firstLoad: boolean;
  initiatorType: string;
  os: string;
  path: string;
  viewportHeight: number;
  viewportWidth: number;
  visitor: string;
}
