import type { FindOptions } from '@mikro-orm/core/drivers/IDatabaseDriver';
import type { FilterQuery } from '@mikro-orm/core/typings';

import { PaginatorDto } from '@app/api/paginator.dto';
import { TransformerService } from '@app/api/transformer.service';
import { EntityManager, EntityName } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';

@Injectable()
export class PaginatorService {
  constructor(
    private entityManager: EntityManager,
    private transformerService: TransformerService,
  ) {}

  public async findAll<Entity extends object, Dto extends object>(
    [entity, DtoClass]: [EntityName<Entity>, ClassConstructor<Dto>],
    options: FindOptions<Entity, any, any>,
    where?: FilterQuery<Entity>,
  ) {
    const repository = this.entityManager.getRepository<Entity>(entity);

    const [items, total] = await repository.findAndCount(where, options);

    return new PaginatorDto(
      items.map((entity: Entity) =>
        this.transformerService.entityToDto<Entity, Dto>(entity, DtoClass),
      ),
      {
        limit: options.limit,
        offset: options.offset,
        total,
      },
    );
  }
}
