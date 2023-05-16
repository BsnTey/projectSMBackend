import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
