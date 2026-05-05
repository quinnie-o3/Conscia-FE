import { Test, TestingModule } from '@nestjs/testing';
import { UsageSessionController } from './usage-session.controller';

describe('UsageSessionController', () => {
  let controller: UsageSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsageSessionController],
    }).compile();

    controller = module.get<UsageSessionController>(UsageSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
