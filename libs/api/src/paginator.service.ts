import { Injectable } from '@nestjs/common';
import { EntityManager, EntityName } from '@mikro-orm/core';
import type { FilterQuery } from '@mikro-orm/core/typings';
import type { FindOptions } from '@mikro-orm/core/drivers/IDatabaseDriver';
import { PaginatorDto } from '@app/api/paginator.dto';

@Injectable()
export class PaginatorService {
  constructor(private entityManager: EntityManager) {}

  public async findAll<Entity extends object>(
    entity: EntityName<Entity>,
    options: FindOptions<Entity>,
    where?: FilterQuery<Entity>,
  ) {
    const repository = this.entityManager.getRepository<Entity>(entity);

    const [items, total] = await repository.findAndCount(where, {
      cache: 60 * 1000,
      ...options,
    } as FindOptions<Entity>);

    return new PaginatorDto(items, {
      total,
      limit: options.limit,
      offset: options.offset,
    });
  }
}
