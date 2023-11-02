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
import {
  ProductByNameQuery,
  ProductQuery,
} from '../../types/query.types';
import { JwtAuthGuard } from '../../guards/JwtAuth.guard';
import { Request } from 'express';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Product } from '../../entities/product.entity';
import { ProductAllQueryDto } from '../../dto/product-query.dto';
import { Favorite_Product } from '../../entities/favorite_product.entity';

@Controller(PRODUCT_ROUTES.BASE)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOkResponse({
    description: 'Return products by query',
    type: [Product],
  })
  @ApiBadRequestResponse({
    description: 'Return error',
  })
  @Get('')
  getAll(@Query() query: ProductAllQueryDto) {
    return this.productsService.getAll(query);
  }

  @ApiOkResponse({
    description: 'Return 10 new products',
    type: [Product],
  })
  @ApiBadRequestResponse({
    description: 'Return error',
  })
  @Get(PRODUCT_ROUTES.GET_NEW)
  getNew() {
    return this.productsService.getNew();
  }

  @ApiOkResponse({
    description: 'Return 10 products with discount',
    type: [Product],
  })
  @ApiBadRequestResponse({
    description: 'Return error',
  })
  @Get(PRODUCT_ROUTES.GET_DISCOUNT)
  getDiscount() {
    return this.productsService.getDiscount();
  }

  @ApiOkResponse({
    description: 'Return 10 random products except one with id from query',
    type: [Product],
  })
  @ApiBadRequestResponse({
    description: 'Return error',
  })
  @Get(PRODUCT_ROUTES.GET_RECOMMENDED)
  getRecommended(@Query() query: ProductQuery, @Param('id') id: string) {
    return this.productsService.getRecommended(id, query);
  }

  @ApiOkResponse({
    description: 'Return 6 products from db by name',
    type: [Product],
  })
  @ApiBadRequestResponse({
    description: 'Return error',
  })
  @Get(PRODUCT_ROUTES.GET_BY_NAME)
  getByName(@Query() query: ProductByNameQuery) {
    return this.productsService.getByQuery(query.name);
  }

  @ApiOkResponse({
    description: 'Return counts for all categories in db',
  })
  @ApiBadRequestResponse({
    description: 'Return error',
  })
  @Get(PRODUCT_ROUTES.GET_CATEGORY_COUNT)
  getCategoryCount() {
    return this.productsService.getCategoryCount();
  }

  @ApiOkResponse({
    description: 'Add product to favorite table',
    type: [Favorite_Product],
  })
  @ApiBadRequestResponse({
    description: 'Return error',
  })
  @Post(PRODUCT_ROUTES.ADD_TO_FAVORITE)
  @UseGuards(JwtAuthGuard)
  addToFavorite(@Req() request: Request, @Param('id') id: string) {
    return this.productsService.addToFavorite(request, id);
  }

  @ApiOkResponse({
    description: 'Remove product from favorite table',
  })
  @ApiBadRequestResponse({
    description: 'Return error',
  })
  @Delete(PRODUCT_ROUTES.REMOVE_FROM_FAVORITE)
  @UseGuards(JwtAuthGuard)
  removeFromFavorite(@Req() request: Request, @Param('id') id: string) {
    return this.productsService.removeFromFavorite(request, id);
  }

  @ApiOkResponse({
    description: 'Remove all favorites product for user',
    type: [Product],
  })
  @ApiBadRequestResponse({
    description: 'Return error',
  })
  @Get(PRODUCT_ROUTES.GET_FAVORITES)
  @UseGuards(JwtAuthGuard)
  getFavorites(@Req() request: Request) {
    return this.productsService.getFavorites(request);
  }

  @ApiOkResponse({
    description: 'Return product by id',
    type: Product,
  })
  @ApiBadRequestResponse({
    description: 'Return error',
  })
  @Get(PRODUCT_ROUTES.GET_CURRENT)
  getCurrent(@Param('id') id: string) {
    return this.productsService.getCurrent(id);
  }
}
