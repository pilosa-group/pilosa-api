import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export abstract class UpsertProjectDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  name: string;
}
