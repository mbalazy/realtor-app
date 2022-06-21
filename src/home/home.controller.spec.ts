import { Test, TestingModule } from '@nestjs/testing';
import { HomeModuleMeta } from './home.module';
import { HomeController } from './home.controller';

describe('HomeController', () => {
  let controller: HomeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      HomeModuleMeta,
    ).compile();

    controller = module.get<HomeController>(HomeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
