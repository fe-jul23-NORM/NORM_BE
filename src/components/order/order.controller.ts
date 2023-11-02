import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ORDER_ROUTES } from '../../constants/routes';
import { OrderService } from './order.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../../guards/JwtAuth.guard';
import { UserOrderDto } from '../../dto/user-order.dto';
import { GuestOrderDto } from '../../dto/guest-order.dto';
import { Order } from '../../entities/order.entity';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller(ORDER_ROUTES.DEFAULT)
export class OrderController {
  constructor(private orderService: OrderService) {}

  @ApiOkResponse({
    description: 'Return created order',
    type: Order,
  })
  @ApiBadRequestResponse({
    description: "The order won't be created.",
  })
  @Post(ORDER_ROUTES.CREATE_BY_USER)
  @UseGuards(JwtAuthGuard)
  createByUser(
    @Req() request: Request,
    @Body() dto: UserOrderDto,
  ): Promise<Order | HttpException> {
    return this.orderService.create(request, dto);
  }

  @ApiOkResponse({
    description: 'Return created order',
    type: Order,
  })
  @ApiBadRequestResponse({
    description: "The order won't be created.",
  })
  @Post(ORDER_ROUTES.CREATE_BY_GUEST)
  createByGuest(@Req() request: Request, @Body() dto: GuestOrderDto) {
    return this.orderService.create(request, dto);
  }

  @ApiOkResponse({
    description: 'Return all user orders',
    type: [Order],
  })
  @ApiBadRequestResponse({
    description: 'Return error',
  })
  @Get(ORDER_ROUTES.GET)
  @UseGuards(JwtAuthGuard)
  get(@Req() request: Request) {
    return this.orderService.getForUser(request);
  }
}
