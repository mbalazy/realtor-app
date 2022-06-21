import { Test, TestingModule } from '@nestjs/testing';
import { HomeModuleMeta } from './home.module';
import { HomeService } from './home.service';

describe('HomeService', () => {
  let service: HomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      HomeModuleMeta,
    ).compile();

    service = module.get<HomeService>(HomeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
