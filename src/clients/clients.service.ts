import { Injectable } from '@nestjs/common';
import { Client } from './entities/client.entity';

// TODO move to a database
const clients: Client[] = [
  {
    id: 'ae7cbf47-adb2-4ce4-866f-62162c3f3aa2',
    name: 'Web Sustainability',
    urls: ['https://www.websustainability.org', '*'],
    snippetConfig: {
      batchWaitTime: 2000,
    },
  },
  {
    id: '3c681bb7-05ca-4f25-854c-552157b034cf',
    name: 'YouTube',
    urls: ['https://www.youtube.com'],
    snippetConfig: {
      batchWaitTime: 2000,
    },
  },
];

@Injectable()
export class ClientsService {
  async findAll(): Promise<Client[]> {
    return clients;
  }

  async findOne(id: string): Promise<Client | undefined> {
    return clients.find((client) => client.id === id);
  }
}
