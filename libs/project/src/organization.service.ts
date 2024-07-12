import { Organization } from '@app/project/entities/organization.entity';
import { UserDto } from '@app/user/dto/user.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: EntityRepository<Organization>,
  ) {}

  async findOne(slug: string, user: UserDto): Promise<Organization | null> {
    return this.organizationRepository.findOne({
      members: {
        user: {
          id: user.id,
        },
      },
      slug,
    });
  }
}
