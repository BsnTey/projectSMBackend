import { Controller, HttpCode, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '../pipes/validation.pipe';
import { Body, Get, Post, Patch, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
