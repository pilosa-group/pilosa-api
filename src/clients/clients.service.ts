import { Injectable } from '@nestjs/common';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async findAll(): Promise<Client[]> {
    return this.clientRepository
      .createQueryBuilder('client')
      .leftJoinAndSelect('client.snippetConfig', 'snippetConfig')
      .getMany();
  }

  async findOne(id: string): Promise<Client | undefined> {
    return this.clientRepository
      .createQueryBuilder('client')
      .leftJoinAndSelect('client.snippetConfig', 'snippetConfig')
      .where('client.id = :id', { id })
      .getOne();
  }
}
