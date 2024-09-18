import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class UserDto {
  @Expose()
  @IsString()
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsString()
  @Expose()
  name: string;
}
