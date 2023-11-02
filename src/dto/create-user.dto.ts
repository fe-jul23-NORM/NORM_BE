import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ErrorEnum } from '../types/errors.types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of user',
    example: 'Viktor',
  })
  @Length(2, 25)
  @IsString({ message: ErrorEnum.InvalidData })
  readonly firstName: string;
  @ApiProperty({
    description: 'The surname of user',
    example: 'Viktorov',
  })
  @Length(2, 20)
  @IsString({ message: ErrorEnum.InvalidData })
  readonly lastName: string;
  @ApiProperty({
    description: 'The email of user',
    example: 'viktorov@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty({ message: ErrorEnum.InvalidData })
  readonly email: string;
  @ApiProperty({
    description: 'User password',
    example: 'tekilaBoom432',
  })
  @Length(8, 25)
  readonly password: string;
  @ApiProperty({
    description: 'User confirm password',
    example: 'tekilaBoom432',
  })
  @Length(8, 25)
  readonly confirmPassword: string;
}
