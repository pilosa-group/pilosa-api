import { Injectable } from '@nestjs/common';
import { Organization } from '@app/project/entities/organization.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: EntityRepository<Organization>,
  ) {}

  async findOne(id: string): Promise<Organization | null> {
    return this.organizationRepository.findOne({ id });
  }
}
