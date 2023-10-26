import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';
import { SimpleUserDto } from '../../dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../../dto/login-user.dto';
import { ErrorEnum } from '../../types/errors.types';
import { User } from '../../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async login(res, dto) {
    const user = await this.validateUser(dto);
    const tokens = this.tokenService.generateTokens(user);
    await this.tokenService.updateToken(user.id, tokens.refresh);
    res.cookie('nice_gadgets_auth', tokens.refresh, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    const userDTO = new SimpleUserDto(user);
    return { ...userDTO, token: tokens.access };
  }

  async validateUser(dto: LoginUserDto) {
    const user: User = await this.userService.getUserByEmail(dto.email);
    try {
      const isPasswordCorrect = await bcrypt.compare(
        dto.password,
        user.password,
      );
      if (user && isPasswordCorrect) {
        return user;
      }
    } catch {
      throw new HttpException(
        ErrorEnum.WrongLoginPassword,
        HttpStatus.BAD_REQUEST,
      );
    }
    throw new HttpException(
      ErrorEnum.WrongLoginPassword,
      HttpStatus.BAD_REQUEST,
    );
  }

  async logout(req, res) {
    res.clearCookie('nice_gadgets_auth', {
      httpOnly: true,
      secure: true,
      sameSite: true,
    });
  }

  async register(res, candidate) {
    const isExist = await this.userService.getUserByEmail(candidate.email);
    if (isExist)
      throw new HttpException(
        ErrorEnum.UserAlreadyExist,
        HttpStatus.BAD_REQUEST,
      );
    const hashPassword = await bcrypt.hash(candidate.password, 10);
    const user: User = await this.userService.createUser({
      ...candidate,
      password: hashPassword,
    });
    const tokens = this.tokenService.generateTokens(user);
    await this.tokenService.setToken(user.id, tokens.refresh);
    res.cookie('nice_gadgets_auth', tokens.refresh, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    const userDTO = new SimpleUserDto(user);
    return { ...userDTO, token: tokens.access };
  }

  async refresh(req) {
    const jwtToken = req.cookies?.nice_gadgets_auth;
    if (!jwtToken)
      throw new HttpException(
        ErrorEnum.UndefinedToken,
        HttpStatus.UNAUTHORIZED,
      );
    const tokenCheck = await this.tokenService.getTokenByToken(jwtToken);
    if (!tokenCheck)
      throw new HttpException(
        ErrorEnum.UndefinedToken,
        HttpStatus.UNAUTHORIZED,
      );

    try {
      const user: User = this.jwtService.verify(jwtToken, {
        secret: process.env.JWT_REFRESH_SECRET || 'refresh',
      });
      const newTokens = this.tokenService.generateTokens(user);

      if (user.id.toString() !== tokenCheck.user.id.toString()) {
        return new HttpException(
          ErrorEnum.UndefinedToken,
          HttpStatus.UNAUTHORIZED,
        );
      }

      const userBody = await this.userService.getUserByEmail(user.email);
      const simpleUserBody = new SimpleUserDto(userBody);

      return { ...simpleUserBody, token: newTokens.access };
    } catch (e) {
      if (e.message === 'jwt expired') {
        throw new HttpException(
          ErrorEnum.TokenExpired,
          HttpStatus.UNAUTHORIZED,
        );
      }
      throw new HttpException(ErrorEnum.TokenExpired, HttpStatus.UNAUTHORIZED);
    }
  }
}
