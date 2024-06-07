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
  bc: number;

  /**
   * accuracy
   */
  a: number;
}
