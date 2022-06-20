import { Body, Controller, Post } from '@nestjs/common';
import { HomeService } from '../service/home.service';

@Controller('home')
export class HomeController {
  constructor(private homeService: HomeService) {}

  @Post()
  add(@Body() user) {
    console.log(user);
    return this.homeService.add(user);
  }
}
