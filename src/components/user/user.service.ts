import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const result = await this.userRepository
      .createQueryBuilder('user')
      .insert()
      .values(dto)
      .returning('*')
      .execute();

    return result.raw[0];
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}
