import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageDto } from 'src/home/dtos/home.dto';
import { Home } from 'src/home/home.entity';
import { Repository } from 'typeorm';
import { Image } from './image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async createImage(url: string, home: Home) {
    const newImage = this.imageRepository.create({ url, home });
    await this.imageRepository.insert(newImage);

    return newImage;
  }

  async batchCreateImages(imagesToCreate: ImageDto[], home: Home) {
    const createdImages: Image[] = [];

    for (const { url } of imagesToCreate) {
      const newImage = this.imageRepository.create({ url, home });
      createdImages.push(newImage);
    }

    await this.imageRepository.insert(createdImages);

    return createdImages;
  }
}
