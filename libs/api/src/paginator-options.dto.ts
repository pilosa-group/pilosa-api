import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export const MAX_LIMIT = 100;
export const DEFAULT_LIMIT = 20;

export class PaginatorOptionsDto {
  @ApiPropertyOptional({
    default: DEFAULT_LIMIT,
    maximum: MAX_LIMIT,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(MAX_LIMIT)
  @IsOptional()
  readonly limit?: number = DEFAULT_LIMIT;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  readonly offset?: number = 0;
}
