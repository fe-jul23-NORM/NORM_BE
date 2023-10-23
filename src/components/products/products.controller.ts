import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { PRODUCT_ROUTES } from '../../constants/routes';
import { IProductAllQuery } from '../../types/query.types';

@Controller(PRODUCT_ROUTES.BASE)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll(@Query() query: IProductAllQuery) {
    return this.productsService.getAllProducts(query);
  }

  @Get(PRODUCT_ROUTES.GET_CURRENT)
  getCurrent() {
    return this.productsService.getCurrentProduct();
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
  getRecommended() {
    return this.productsService.getRecommendedProducts();
  }
}
