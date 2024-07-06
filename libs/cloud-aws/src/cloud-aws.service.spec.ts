import { Test, TestingModule } from '@nestjs/testing';

import { CloudAwsService } from './cloud-aws.service';

describe('CloudAwsService', () => {
  let service: CloudAwsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudAwsService],
    }).compile();

    service = module.get<CloudAwsService>(CloudAwsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
