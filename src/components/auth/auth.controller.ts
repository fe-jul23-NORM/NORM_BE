import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginUserDto } from '../../dto/login-user.dto';
import { AuthService } from './auth.service';
import { AUTH_ROUTES } from '../../constants/routes';
import { CreateUserDto } from '../../dto/create-user.dto';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { SimpleUserDto } from '../../dto/user.dto';

@Controller(AUTH_ROUTES.DEFAULT)
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({
    description: 'Login in user, generate unique token for him',
    type: SimpleUserDto,
  })
  @ApiBadRequestResponse({
    description: 'User cannot login in',
  })
  @Post(AUTH_ROUTES.LOGIN)
  login(
    @Res({ passthrough: true }) response: Response,
    @Body() dto: LoginUserDto,
  ) {
    return this.authService.login(response, dto);
  }

  @ApiOkResponse({
    description: 'Create user, generate unique token for him',
    type: SimpleUserDto,
  })
  @ApiBadRequestResponse({
    description: 'User cannot create account',
  })
  @Post(AUTH_ROUTES.REGISTER)
  register(
    @Res({ passthrough: true }) response: Response,
    @Body() dto: CreateUserDto,
  ) {
    return this.authService.register(response, dto);
  }

  @ApiOkResponse({
    description: 'Refresh user session, generate new token',
    type: SimpleUserDto,
  })
  @ApiBadRequestResponse({
    description: 'User cannot refresh his access, logout',
  })
  @Get(AUTH_ROUTES.REFRESH)
  refresh(@Req() request: Request) {
    return this.authService.refresh(request);
  }

  @ApiOkResponse({
    description: 'Remove token, canceled user session',
  })
  @ApiBadRequestResponse({
    description: 'User cannot logout',
  })
  @Get(AUTH_ROUTES.LOGOUT)
  logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.logout(request, response);
  }
}
