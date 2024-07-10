import { UserDto } from '@app/user/dto/user';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class ProjectMemberDto {
  @Expose()
  @ApiProperty({ format: 'uuid', type: 'string' })
  id: string;

  @Expose()
  @ApiProperty()
  role: string;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;
}
