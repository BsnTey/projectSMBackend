import { v4 as uuidv4 } from 'uuid';
import { Injectable, Body, Get, Post, Patch, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users = [];

  getAllUsers() {
    return this.users;
  }

  getById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  createUser(UserDto: CreateUserDto) {
    const uuidToken = uuidv4();
    this.users.push({
      ...UserDto,
      id: uuidToken,
    });
    return uuidToken;
  }
}
