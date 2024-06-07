import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';

describe('ClientsService', () => {
  let service: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientService],
    }).compile();

    service = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of clients', () => {
    expect(service.findAll()).resolves.toBeInstanceOf(Array);
  });
});
