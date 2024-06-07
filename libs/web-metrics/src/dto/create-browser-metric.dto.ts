export class CreateBrowserMetricDto {
  firstLoad: boolean;
  bytesCompressed: number;
  bytesUncompressed: number;
  initiatorType: string;
  extension: string;
  domain: string;
  path: string;
  userAgent: string;
  ip: string;
}
