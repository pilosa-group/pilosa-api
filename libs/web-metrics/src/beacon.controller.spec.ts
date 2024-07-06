import { BrowserMetricService } from '@app/web-metrics/browser-metric.service';
import { BrowserMetric } from '@app/web-metrics/entities/browser-metric.entity';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';
import { FrontendAppService } from '@app/web-metrics/frontend-app.service';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';

import { BeaconController } from './beacon.controller';

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
