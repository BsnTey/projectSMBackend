import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { User } from 'src/users/models/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const hashPassword = await argon.hash(userDto.password);
      const user = await this.userService.createUser({
        ...userDto,
        password: hashPassword,
      });
      return this.generateToken(user);
    } catch (error) {
      if (error) {
      } else {
        throw new HttpException(
          'Неизвестная ошибка',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) {
      throw new HttpException(
        'Пользователь с таким email не найден',
        HttpStatus.BAD_REQUEST,
      );
    }

    const passwordEquals = await argon.verify(user.password, userDto.password);

    if (!passwordEquals) {
      throw new UnauthorizedException({ message: 'Пароль не верный' });
    }
    return user;
  }
}
