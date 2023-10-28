import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ErrorEnum } from '../types/errors.types';

export class CreateUserDto {
  @Length(2, 25)
  @IsString({ message: ErrorEnum.InvalidData })
  readonly firstName: string;
  @Length(2, 20)
  @IsString({ message: ErrorEnum.InvalidData })
  readonly lastName: string;
  @IsEmail()
  @IsNotEmpty({ message: ErrorEnum.InvalidData })
  readonly email: string;
  @Length(8, 25)
  readonly password: string;
  @Length(8, 25)
  readonly confirmPassword: string;
}
