import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ErrorEnum } from '../types/errors.types';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email;
  @IsString({ message: ErrorEnum.InvalidData })
  readonly password;
}
