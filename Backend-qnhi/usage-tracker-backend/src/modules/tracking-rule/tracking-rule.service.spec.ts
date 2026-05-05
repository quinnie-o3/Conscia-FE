import { Test, TestingModule } from '@nestjs/testing';
import { TrackingRuleService } from './tracking-rule.service';

describe('TrackingRuleService', () => {
  let service: TrackingRuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrackingRuleService],
    }).compile();

    service = module.get<TrackingRuleService>(TrackingRuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
