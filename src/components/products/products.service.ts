import { Global, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { Repository } from 'typeorm';
import { IProductAllQuery, VALID_SORT_BY } from '../../types/query.types';

@Global()
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAllProducts(productQuery: IProductAllQuery) {
    const { query, page, perPage, sortBy } = productQuery;

    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .skip((Number(page) - 1) * Number(perPage))
      .take(Number(perPage));

    if (sortBy && VALID_SORT_BY.includes(sortBy)) {
      queryBuilder.orderBy(`product.${sortBy}`, 'DESC');
    }

    if (query) {
      queryBuilder.andWhere('LOWER(product.name) LIKE :name', {
        name: `%${query.toLowerCase()}%`,
      });
    }

    const [result, total] = await queryBuilder.getManyAndCount();

    const test = result.map((item) => item.price);

    return {
      test,
      total,
    };
  }

  getCurrentProduct() {
    return 1;
  }

  getNewProducts() {
    return [];
  }

  getDiscountProducts() {
    return [];
  }

  getRecommendedProducts() {
    return [];
  }
}
