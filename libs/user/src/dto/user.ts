import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  @ApiProperty()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;
}
