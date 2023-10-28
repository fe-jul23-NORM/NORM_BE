import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { PRODUCT_ROUTES } from '../../constants/routes';
import { ProductAllQuery, ProductQuery } from '../../types/query.types';
import { JwtAuthGuard } from '../../guards/JwtAuth.guard';
import { Request } from 'express';

@Controller(PRODUCT_ROUTES.BASE)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('')
  getAll(@Query() query: ProductAllQuery) {
    return this.productsService.getAll(query);
  }

  @Get(PRODUCT_ROUTES.GET_NEW)
  getNew() {
    return this.productsService.getNew();
  }

  @Get(PRODUCT_ROUTES.GET_DISCOUNT)
  getDiscount() {
    return this.productsService.getDiscount();
  }

  @Get(PRODUCT_ROUTES.GET_RECOMMENDED)
  getRecommended(@Query() query: ProductQuery, @Param('id') id: string) {
    return this.productsService.getRecommended(id, query);
  }

  @Post(PRODUCT_ROUTES.ADD_TO_FAVORITE)
  @UseGuards(JwtAuthGuard)
  addToFavorite(@Req() request: Request, @Param('id') id: string) {
    return this.productsService.addToFavorite(request, id);
  }

  @Delete(PRODUCT_ROUTES.REMOVE_FROM_FAVORITE)
  @UseGuards(JwtAuthGuard)
  removeFromFavorite(@Req() request: Request, @Param('id') id: string) {
    return this.productsService.removeFromFavorite(request, id);
  }

  @Get(PRODUCT_ROUTES.GET_FAVORITES)
  @UseGuards(JwtAuthGuard)
  getFavorites(@Req() request: Request) {
    return this.productsService.getFavorites(request);
  }

  @Get(PRODUCT_ROUTES.GET_CURRENT)
  getCurrent(@Param('id') id: string) {
    return this.productsService.getCurrent(id);
  }
}
