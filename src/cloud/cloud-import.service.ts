import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudImport } from './entities/cloud-import';

@Injectable()
export class CloudImportService {
  constructor(
    @InjectRepository(CloudImport)
    private cloudImportRepository: Repository<CloudImport>,
  ) {}

  /**
   * Find the last imported cloud import for a provider,
   * and that was imported more than 5 minutes ago.
   *
   * @param provider
   */
  async findOneLatestImported(
    provider: CloudImport['provider'],
  ): Promise<CloudImport | null> {
    return this.cloudImportRepository
      .createQueryBuilder('ci')
      .leftJoinAndSelect('ci.client', 'client')
      .andWhere('ci.provider = :provider', { provider })
      .andWhere('ci.lastImportedAt < :lastImportedAt', {
        lastImportedAt: new Date(new Date().getTime() - 5 * 60 * 1000),
      })
      .orderBy('ci.lastImportedAt', 'ASC')
      .getOne();
  }

  /**
   * Save a cloud import status.
   *
   * @param cloudImport
   */
  async save(cloudImport: CloudImport): Promise<CloudImport> {
    return this.cloudImportRepository.save(cloudImport);
  }
}
