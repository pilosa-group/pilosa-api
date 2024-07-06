import { Expose } from 'class-transformer';
import { IsDefined, IsUUID, IsUrl } from 'class-validator';

export const FRONTEND_APP_ID_HEADER_NAME = 'x-id';

export class BeaconRequestHeadersDto {
  @IsUUID()
  @IsDefined()
  @Expose({ name: FRONTEND_APP_ID_HEADER_NAME.toLowerCase() })
  [FRONTEND_APP_ID_HEADER_NAME]: string;

  @IsDefined()
  @IsUrl({
    require_tld: false,
  })
  @Expose({ name: 'referer' })
  referer: string;
}
