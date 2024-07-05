import { Injectable } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ClassTransformOptions } from 'class-transformer/types/interfaces';

@Injectable()
export class TransformerService {
  static defaultOptions: ClassTransformOptions = {
    excludeExtraneousValues: true,
    strategy: 'excludeAll',
  };

  public entityToDto<Entity extends object, Dto extends object>(
    entity: Entity,
    DtoClass: ClassConstructor<Dto>,
  ) {
    return plainToInstance<Dto, Entity>(
      DtoClass,
      entity,
      TransformerService.defaultOptions,
    );
  }
}
