import { Test, TestingModule } from '@nestjs/testing';
import { UsageSessionService } from './usage-session.service';

describe('UsageSessionService', () => {
  let service: UsageSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsageSessionService],
    }).compile();

    service = module.get<UsageSessionService>(UsageSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
