export class CreateBrowserMetricDto {
  firstLoad: boolean;
  colorScheme: 'dark' | 'light';
  bytesCompressed: number;
  bytesUncompressed: number;
  initiatorType: string;
  extension: string;
  domain: string;
  path: string;
  visitor: string;
  device: string;
  os: string;
  browser: string;
  cpu: string;
}
