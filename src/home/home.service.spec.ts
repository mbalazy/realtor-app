import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/user/user.entity';
import { HomeResponseDto } from './dtos/home.dto';
import { HomeModuleMeta } from './home.module';
import { CreateHomeParams, HomeService } from './home.service';

describe('HomeService', () => {
  let service: HomeService;

  const home: CreateHomeParams = {
    address: 'aa',
    number_of_bedrooms: 1,
    number_of_bathrooms: 1,
    city: 'A',
    listed_date: new Date(1400000),
    price: 1,
    land_size: 1,
    images: [],
  };

  const moreHomes: CreateHomeParams[] = [
    { ...home },
    { ...home, city: 'B' },
    { ...home, city: 'C' },
    { ...home, city: 'C', price: 2 },
    { ...home, city: 'C', price: 10 },
    { ...home, city: 'B', price: 15 },
  ];
  const mockRealtor = new User();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      HomeModuleMeta,
    ).compile();

    service = module.get<HomeService>(HomeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create home', () => {
    it('should create home', async () => {
      const mockNewHouse = new HomeResponseDto(home);
      const response = await service.createHome(home, mockRealtor);
      expect(response).toMatchObject(mockNewHouse);
    });
  });

  describe('Geting homes', () => {
    it('should get one home', async () => {
      const response = await service.createHome(home, mockRealtor);
      const getHome = await service.getHome(1);

      expect(response).toMatchObject(getHome);
    });

    it('should filter by city', async () => {
      for (const home of moreHomes) {
        await service.createHome(home, mockRealtor);
      }

      const homesCityEqC = await service.getHomes({ city: 'C' });

      expect(homesCityEqC).toHaveLength(3);

      for (const home of homesCityEqC) {
        expect(home.city).toEqual('C');
      }
    });

    it('should filter by maxPrice', async () => {
      for (const home of moreHomes) {
        await service.createHome(home, mockRealtor);
      }

      const homesPriceL9 = await service.getHomes({ maxPrice: '9' });

      expect(homesPriceL9).toHaveLength(4);

      for (const home of homesPriceL9) {
        expect(home.price).toBeLessThan(9);
      }
    });

    it('should filter by minPrice', async () => {
      for (const home of moreHomes) {
        await service.createHome(home, mockRealtor);
      }

      const homesPriceM3 = await service.getHomes({ minPrice: '3' });

      expect(homesPriceM3).toHaveLength(2);

      for (const home of homesPriceM3) {
        expect(home.price).toBeGreaterThan(3);
      }
    });

    it('should filter by min and max price', async () => {
      for (const home of moreHomes) {
        await service.createHome(home, mockRealtor);
      }

      const homesPriceM3 = await service.getHomes({
        minPrice: '3',
        maxPrice: '12',
      });

      expect(homesPriceM3).toHaveLength(1);

      expect(homesPriceM3[0].price).toBe(10);
    });
  });
});
