import { Test, TestingModule } from '@nestjs/testing';
import { BeaconController } from './beacon.controller';
import { BrowserMetric } from '@app/web-metrics/entities/browser-metric.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';
import { FrontendAppService } from '@app/web-metrics/frontend-app.service';
import { BrowserMetricService } from '@app/web-metrics/browser-metric.service';

const mockBrowserMetricsRepository = {};
const mockFrontendAppRepository = {};

describe('BeaconController', () => {
  let controller: BeaconController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeaconController],
      providers: [
        FrontendAppService,
        BrowserMetricService,
        {
          provide: getRepositoryToken(BrowserMetric),
          useValue: mockBrowserMetricsRepository,
        },
        {
          provide: getRepositoryToken(FrontendApp),
          useValue: mockFrontendAppRepository,
        },
      ],
    }).compile();

    controller = module.get<BeaconController>(BeaconController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
