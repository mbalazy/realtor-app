import { Module, ModuleMetadata } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageModule } from 'src/image/image.module';
import { DatabaseModule } from '../database/database.module';
import { HomeController } from './home.controller';
import { Home } from './home.entity';
import { Image } from '../image/image.entity';
import { HomeService } from './home.service';

export const HomeModuleMeta: ModuleMetadata = {
  imports: [
    TypeOrmModule.forFeature([Home, Image]),
    DatabaseModule,
    ImageModule,
  ],
  controllers: [HomeController],
  providers: [HomeService],
};

@Module(HomeModuleMeta)
export class HomeModule {}
