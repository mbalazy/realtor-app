import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exeptions } from 'src/utils/Exeptions';
import { Between, LessThan, MoreThan, Repository } from 'typeorm';
import { CreateHomeDto, HomeResponseDto } from './dtos/home.dto';
import { Home, PropertyType } from './home.entity';

export type createHomeParams = CreateHomeDto;

@Injectable()
export class HomeService extends Exeptions {
  constructor(
    @InjectRepository(Home)
    private homeRepository: Repository<Home>,
  ) {
    super();
  }

  async getHomes({
    city,
    minPrice,
    maxPrice,
    propertyType,
  }: {
    city?: string;
    minPrice?: string;
    maxPrice?: string;
    propertyType?: PropertyType;
  }) {
    const homes = await this.homeRepository.find({
      relations: { images: true },
      select: { images: { url: true } },
      where: {
        city,
        propertyType,
        price: this.filterByPrice({ minPrice, maxPrice }),
      },
    });

    if (homes.length === 0) {
      this.throwHttpExeption('No homes were found');
    }

    return homes.map(
      (home) =>
        new HomeResponseDto({
          ...home,
          image: home?.images[0]?.url || null,
        }),
    );
  }

  async getHome(id: number) {
    const home = await this.homeRepository.findOne({ where: { id } });

    if (!home) {
      this.throwHttpExeption('Can not find home');
    }

    return new HomeResponseDto(home);
  }

  async createHome(home: createHomeParams) {
    const newHome = this.homeRepository.create(home);
    await this.homeRepository.save(newHome);
    return new HomeResponseDto(newHome);
  }

  filterByPrice({ minPrice, maxPrice }) {
    if (minPrice && !maxPrice) {
      return MoreThan(Number(minPrice));
    }
    if (maxPrice && !minPrice) {
      return LessThan(Number(minPrice));
    }
    if (maxPrice && minPrice) {
      return Between(Number(minPrice), Number(maxPrice));
    }
    return undefined;
  }
}
