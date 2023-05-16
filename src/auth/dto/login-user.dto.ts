import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'Некорректный email' })
  @IsNotEmpty({ message: 'Не указан email' })
  readonly email: string;

  @IsNotEmpty({ message: 'Не указан пароль' })
  @IsString({ message: 'Некорректный формат пароля' })
  @Length(4, 16, {
    message: 'Пароль должен быть не менее 4 и не более 16 символов',
  })
  readonly password: string;
}
