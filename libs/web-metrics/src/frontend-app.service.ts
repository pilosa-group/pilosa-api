import { UserDto } from '@app/user/dto/user.dto';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { FrontendApp } from './entities/frontend-app.entity';

@Injectable()
export class FrontendAppService {
  constructor(
    @InjectRepository(FrontendApp)
    private frontendAppRepository: EntityRepository<FrontendApp>,
  ) {}

  async findOneById(
    id: FrontendApp['id'],
    user: UserDto,
  ): Promise<FrontendApp> {
    return this.frontendAppRepository.findOne({
      id,
      project: {
        members: {
          user: {
            id: user.id,
          },
        },
      },
    });
  }

  async findOneByIdForBeacon(id: FrontendApp['id']): Promise<FrontendApp> {
    return this.frontendAppRepository.findOne(
      {
        id,
      },
      {
        cache: 60 * 1000, // 1 minute
      },
    );
  }
}
