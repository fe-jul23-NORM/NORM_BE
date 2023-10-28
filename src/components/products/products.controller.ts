import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { PRODUCT_ROUTES } from '../../constants/routes';
import { ProductAllQuery, ProductQuery } from '../../types/query.types';

@Controller(PRODUCT_ROUTES.BASE)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('')
  getAll(@Query() query: ProductAllQuery) {
    return this.productsService.getAllProducts(query);
  }

  @Get(PRODUCT_ROUTES.GET_NEW)
  getNew() {
    return this.productsService.getNewProducts();
  }

  @Get(PRODUCT_ROUTES.GET_DISCOUNT)
  getDiscount() {
    return this.productsService.getDiscountProducts();
  }

  @Get(PRODUCT_ROUTES.GET_RECOMMENDED)
  getRecommended(@Query() query: ProductQuery, @Param('id') id: string) {
    return this.productsService.getRecommendedProducts(id, query);
  }

  @Get(PRODUCT_ROUTES.GET_CURRENT)
  getCurrent(@Param('id') id: string) {
    return this.productsService.getCurrentProduct(id);
  }
}
