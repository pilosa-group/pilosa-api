export class CreateBrowserMetricDto {
  firstLoad: boolean;
  colorScheme: 'dark' | 'light';
  bytesCompressed: number;
  bytesUncompressed: number;
  initiatorType: string;
  extension: string;
  domain: string;
  path: string;
  userAgent: string;
  visitor: string;
}
