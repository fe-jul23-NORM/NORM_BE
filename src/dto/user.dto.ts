import { User } from '../entities/user.entity';

export class SimpleUserDto {
  constructor(user: User) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.id = user.id;
  }
  id: string | number;
  email: string;
  firstName: string;
  lastName: string;
}
