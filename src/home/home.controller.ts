import { Body, Controller, Post } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
  constructor(private homeService: HomeService) {}

  @Post()
  async add(@Body() body) {
    return await this.homeService.add(body);
  }
}
