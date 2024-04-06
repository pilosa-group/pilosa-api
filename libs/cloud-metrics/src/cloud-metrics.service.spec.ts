import { Test, TestingModule } from '@nestjs/testing';
import { CloudMetricsService } from './cloud-metrics.service';

describe('CloudMetricsService', () => {
  let service: CloudMetricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudMetricsService],
    }).compile();

    service = module.get<CloudMetricsService>(CloudMetricsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
