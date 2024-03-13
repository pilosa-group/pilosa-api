import { Test, TestingModule } from '@nestjs/testing';
import { BeaconController } from './beacon.controller';

describe('BeaconController', () => {
  let controller: BeaconController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeaconController],
    }).compile();

    controller = module.get<BeaconController>(BeaconController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
