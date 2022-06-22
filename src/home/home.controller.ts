import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
  constructor(private homeService: HomeService) {}

  @Get()
  async getHomes() {
    return [];
  }

  @Get(':id')
  async getHome() {
    return {};
  }

  @Post()
  async createHome() {
    return {};
  }

  @Put(':id')
  async udpateHome() {
    return {};
  }

  @Delete(':id')
  async deleteHome() {
    return {};
  }
}
