import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ORDER_ROUTES } from '../../constants/routes';
import { OrderService } from './order.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../../guards/JwtAuth.guard';
import { UserOrderDto } from '../../dto/user-order.dto';
import { GuestOrderDto } from '../../dto/guest-order.dto';

@Controller(ORDER_ROUTES.DEFAULT)
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post(ORDER_ROUTES.CREATE_BY_USER)
  @UseGuards(JwtAuthGuard)
  createByUser(@Req() request: Request, @Body() dto: UserOrderDto) {
    return this.orderService.create(request, dto);
  }

  @Post(ORDER_ROUTES.CREATE_BY_GUEST)
  createByGuest(@Req() request: Request, @Body() dto: GuestOrderDto) {
    return this.orderService.create(request, dto);
  }

  @Get(ORDER_ROUTES.GET)
  @UseGuards(JwtAuthGuard)
  get(@Req() request: Request) {
    return this.orderService.getForUser(request);
  }
}
