import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString({ message: 'Must be a string' })
  readonly email;
  @IsString({ message: 'Must be a string' })
  readonly password;
}
