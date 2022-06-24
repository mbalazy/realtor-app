import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    await this.imageRepository.save(newImage);

    return newImage;
  }
}
