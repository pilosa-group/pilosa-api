import { Injectable } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';

@Injectable()
export class TransformerService {
  public entityToDto<Entity extends object, Dto extends object>(
    entity: Entity,
    DtoClass: ClassConstructor<Dto>,
  ) {
    return plainToInstance<Dto, Entity>(DtoClass, entity, {
      excludeExtraneousValues: true,
      strategy: 'excludeAll',
    });
  }
}
