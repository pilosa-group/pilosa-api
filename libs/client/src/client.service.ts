import { Injectable } from '@nestjs/common';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async findAll(): Promise<Client[]> {
    return this.clientRepository.createQueryBuilder('client').getMany();
  }

  async findOne(id: string): Promise<Client | undefined> {
    return this.clientRepository
      .createQueryBuilder('client')
      .where('client.id = :id', { id })
      .getOne();
  }
}
