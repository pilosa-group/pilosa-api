export class CreateBrowserMetricDto {
  clientId: string;

  /**
   * domain
   */
  d: string;

  /**
   * path
   */
  p: string;

  /**
   * bytes
   */
  b: number;

  /**
   * cached bytes
   */
  cb: number;

  /**
   * accuracy
   */
  a: number;
}
