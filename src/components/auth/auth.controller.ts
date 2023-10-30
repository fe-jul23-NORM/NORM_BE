import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginUserDto } from '../../dto/login-user.dto';
import { AuthService } from './auth.service';
import { AUTH_ROUTES } from '../../constants/routes';
import { CreateUserDto } from '../../dto/create-user.dto';

@Controller(AUTH_ROUTES.DEFAULT)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(AUTH_ROUTES.LOGIN)
  login(
    @Res({ passthrough: true }) response: Response,
    @Body() dto: LoginUserDto,
  ) {
    return this.authService.login(response, dto);
  }

  @Post(AUTH_ROUTES.REGISTER)
  register(
    @Res({ passthrough: true }) response: Response,
    @Body() dto: CreateUserDto,
  ) {
    return this.authService.register(response, dto);
  }

  @Get(AUTH_ROUTES.REFRESH)
  refresh(@Req() request: Request) {
    return this.authService.refresh(request);
  }

  @Get(AUTH_ROUTES.LOGOUT)
  logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.logout(request, response);
  }
}
