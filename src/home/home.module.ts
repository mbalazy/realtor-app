import { Module, ModuleMetadata } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Home } from './home.entity';
import { DatabaseModule } from '../database/database.module';

export const HomeModuleMeta: ModuleMetadata = {
  imports: [TypeOrmModule.forFeature([Home]), DatabaseModule],
  controllers: [HomeController],
  providers: [HomeService],
  // exports: [TypeOrmModule],
};

@Module(HomeModuleMeta)
export class HomeModule {}
