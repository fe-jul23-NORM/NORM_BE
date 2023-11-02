import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ErrorEnum } from '../types/errors.types';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'The email of user',
    example: 'viktorov@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email;
  @ApiProperty({
    description: 'User password',
    example: 'tekilaBoom432',
  })
  @IsString({ message: ErrorEnum.InvalidData })
  readonly password;
}
