import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class SimpleUserDto {
  constructor(user: User) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.id = user.id;
  }
  @ApiProperty({
    description: 'User id',
    example: 1,
  })
  id: string | number;
  @ApiProperty({
    description: 'User email',
    example: 'test@gmail.com',
  })
  email: string;
  @ApiProperty({
    description: 'User first name',
    example: 'Viktor',
  })
  firstName: string;
  @ApiProperty({
    description: 'User surname',
    example: 'Viktorov',
  })
  lastName: string;

  @ApiProperty({
    description: 'User token',
    example: 'xcdsjknskjnkm342nmxc.gdfgmktrmnkn.zxc21q312dsv.sdfsdffsd',
  })
  token?: string;
}
