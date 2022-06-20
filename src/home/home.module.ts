import { Module, ModuleMetadata } from '@nestjs/common';
import { HomeService } from './service/home.service';
import { HomeController } from './controller/home.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Home } from './entity/home.entity';
import { DatabaseModule } from '../database/database.module';

export const HomeModuleMeta: ModuleMetadata = {
  imports: [TypeOrmModule.forFeature([Home]), DatabaseModule],
  controllers: [HomeController],
  providers: [HomeService],
  // exports: [TypeOrmModule],
};

@Module(HomeModuleMeta)
export class HomeModule {}
