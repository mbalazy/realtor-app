import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { CreateHomeDto, HomeResponseDto, UpdateHomeDto } from './dtos/home.dto';
import { PropertyType } from './home.entity';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  async getHomes(
    @Query('city') city?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('propertyType') propertyType?: PropertyType,
  ): Promise<HomeResponseDto[]> {
    return this.homeService.getHomes({
      city,
      minPrice,
      maxPrice,
      propertyType,
    });
  }

  @Get(':id')
  async getHome(@Param('id') id: number): Promise<HomeResponseDto> {
    return this.homeService.getHome(id);
  }

  @Post()
  async createHome(@Body() body: CreateHomeDto): Promise<HomeResponseDto> {
    const mockRealtor = new User();
    return this.homeService.createHome(body, mockRealtor);
  }

  @Put(':id')
  async udpateHome(@Body() body: UpdateHomeDto, @Param('id') id: number) {
    return this.homeService.udpateHome(id, body);
  }

  @Delete(':id')
  async deleteHome(@Param('id') id: number) {
    return this.homeService.deleteHome(id);
  }
}
