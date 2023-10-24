import { Global, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { Repository } from 'typeorm';
import { IProductAllQuery, VALID_SORT_BY } from '../../types/query.types';
import * as path from 'path';
import * as fs from 'fs';

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

    return {
      result,
      total,
    };
  }

  async getCurrentProduct(id: string) {
    const filePath = path.join(__dirname, `../../../public/phones/${id}.json`);

    try {
      return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
      return new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
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
