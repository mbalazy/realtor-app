import { Module, ModuleMetadata } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { ImageService } from './image.service';

export const ImageModuleMetadata: ModuleMetadata = {
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [ImageService],
  exports: [ImageService],
};

@Module(ImageModuleMetadata)
export class ImageModule {}
