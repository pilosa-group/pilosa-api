import { Expose } from 'class-transformer';

export class HostingV1Dto {
  @Expose()
  domain: string;

  @Expose()
  green: boolean;
}
