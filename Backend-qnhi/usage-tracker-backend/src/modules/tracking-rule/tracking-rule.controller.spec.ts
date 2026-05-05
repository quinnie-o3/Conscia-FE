import { Test, TestingModule } from '@nestjs/testing';
import { TrackingRuleController } from './tracking-rule.controller';

describe('TrackingRuleController', () => {
  let controller: TrackingRuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrackingRuleController],
    }).compile();

    controller = module.get<TrackingRuleController>(TrackingRuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
