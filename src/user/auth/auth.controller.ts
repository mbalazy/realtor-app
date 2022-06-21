import { Body, Controller, Post } from '@nestjs/common';
import { SignupUserDto } from '../dtos/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignupUserDto) {
    return await this.authService.signup(body);
  }
}
