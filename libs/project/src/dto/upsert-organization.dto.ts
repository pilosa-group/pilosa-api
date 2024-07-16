import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export abstract class UpsertOrganizationDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  name: string;
}
