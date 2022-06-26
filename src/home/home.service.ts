import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageService } from 'src/image/image.service';
import { User } from 'src/user/user.entity';
import { Exeptions } from 'src/utils/Exeptions';
import { Between, LessThan, MoreThan, Repository } from 'typeorm';
import { CreateHomeDto, HomeResponseDto, UpdateHomeDto } from './dtos/home.dto';
import { Home, PropertyType } from './home.entity';

export type CreateHomeParams = CreateHomeDto;
export type UpdateHomeParams = UpdateHomeDto;

@Injectable()
export class HomeService extends Exeptions {
  constructor(
    @InjectRepository(Home)
    private homeRepository: Repository<Home>,

    @Inject(ImageService)
    private imageService: ImageService,
  ) {
    super();
  }

  async getHomes({
    city,
    minPrice,
    maxPrice,
    propertyType,
  }: {
    // todo move to .types
    city?: string;
    minPrice?: string;
    maxPrice?: string;
    propertyType?: PropertyType;
  }) {
    const homes = await this.homeRepository.find({
      relations: { images: true },
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
    const home = await this.homeRepository.findOne({
      where: { id },
      relations: { images: true },
    });

    if (!home) {
      this.throwHttpExeption('Can not find home');
    }

    return new HomeResponseDto(home);
  }

  async createHome(home: CreateHomeParams, realtor: User) {
    const newHome = this.homeRepository.create({
      ...home,
      realtor,
    });
    await this.homeRepository.insert(newHome);

    const imagesToCreate = home?.images;
    if (imagesToCreate.length > 0) {
      await this.imageService.batchCreateImages(imagesToCreate, newHome);
    }

    return new HomeResponseDto(newHome);
  }

  // todo test this
  async udpateHome(id: number, home: UpdateHomeParams) {
    const updatedHome = await this.homeRepository.update({ id }, home);

    return updatedHome.affected === 1
      ? 'done'
      : this.throwHttpExeption('Can not update any home');
  }

  // todo test this
  async deleteHome(id: number) {
    const deletedHome = await this.homeRepository.delete(id);

    return deletedHome.affected === 1
      ? 'done'
      : this.throwHttpExeption(`Home with id: ${id} - not found`);
  }

  filterByPrice({ minPrice, maxPrice }) {
    if (minPrice && !maxPrice) {
      return MoreThan(Number(minPrice));
    }
    if (maxPrice && !minPrice) {
      return LessThan(Number(maxPrice));
    }
    if (maxPrice && minPrice) {
      return Between(Number(minPrice), Number(maxPrice));
    }
    return undefined;
  }
}
