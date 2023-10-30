import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from '../../entities/token.entity';
import { User } from '../../entities/user.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private jwtService: JwtService,
  ) {}

  getTokenByUserId(user_id): Promise<Token> {
    return this.tokenRepository
      .createQueryBuilder('token')
      .where({
        user: user_id,
      })
      .getOne();
  }

  getTokenByToken(token): Promise<Token> {
    return this.tokenRepository
      .createQueryBuilder('token')
      .leftJoinAndSelect('token.user', 'user')
      .where({
        token: token,
      })
      .getOne();
  }

  generateTokens(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    return {
      access: this.jwtService.sign(payload, {
        expiresIn: '30m',
        privateKey: process.env.JWT_ACCESS_SECRET || 'access',
      }),
      refresh: this.jwtService.sign(payload, {
        expiresIn: '30d',
        privateKey: process.env.JWT_REFRESH_SECRET || 'refresh',
      }),
    };
  }

  async setToken(user_id, token) {
    const result = await this.tokenRepository
      .createQueryBuilder('token')
      .insert()
      .values({
        user: user_id,
        token,
      })
      .returning('*')
      .execute();

    return result.raw[0];
  }

  async updateToken(user_id, token) {
    const tokenToUpdate = await this.getTokenByUserId(user_id);
    if (tokenToUpdate) {
      tokenToUpdate.token = token;
      return this.tokenRepository.save(tokenToUpdate);
    } else {
      return this.setToken(user_id, token);
    }
  }
}
