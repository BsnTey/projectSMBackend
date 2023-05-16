import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Некорректный email' })
  @IsNotEmpty({ message: 'Не указан email' })
  readonly email: string;

  @IsString({ message: 'Некорректный формат имени' })
  readonly name: string;

  @IsNotEmpty({ message: 'Не указан пароль' })
  @IsString({ message: 'Некорректный формат пароля' })
  @Length(4, 16, {
    message: 'Пароль должен быть не менее 4 и не более 16 символов',
  })
  readonly password: string;

  @IsNotEmpty({ message: 'Не указан telegramId' })
  @IsNumberString({}, { message: 'Должен быть числом' })
  @IsPositive({ message: 'Должен быть больше 0' })
  readonly telegramId: number;
}
