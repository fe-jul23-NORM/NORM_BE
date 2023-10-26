import { Global, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { Not, Repository } from 'typeorm';
import {
  IProductAllQuery,
  IProductQuery,
  VALID_SORT_BY,
} from '../../types/query.types';
import * as path from 'path';
import * as fs from 'fs';
import { ErrorEnum } from '../../types/errors.types';
import { getRandomProducts } from '../../helpers/products.helper';

@Global()
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAllProducts(productQuery: IProductAllQuery) {
    const { query, page, perPage, sortBy, productType } = productQuery;
    let currentPage = Number(page);

    try {
      const queryBuilder = this.productRepository
        .createQueryBuilder('product')
        .where('product.category = :category', { category: productType });

      if (sortBy && VALID_SORT_BY.includes(sortBy)) {
        queryBuilder.orderBy(`product.${sortBy}`, 'DESC');
      }

      if (query) {
        queryBuilder.andWhere('LOWER(product.name) LIKE :name', {
          name: `%${query.toLowerCase()}%`,
        });
      }

      const totalCount = await queryBuilder.getCount();
      const maxPage = Math.ceil(totalCount / Number(perPage));
      if (maxPage < currentPage) {
        currentPage = maxPage;
      }

      const [result, total] = await queryBuilder
        .skip((currentPage - 1) * Number(perPage))
        .take(Number(perPage))
        .getManyAndCount();

      return {
        result,
        total,
        page: currentPage,
      };
    } catch (e) {
      throw new HttpException(ErrorEnum.InvalidData, HttpStatus.BAD_REQUEST);
    }
  }

  async getProductById(id: string) {
    const result = await this.productRepository
      .createQueryBuilder('product')
      .where(`product.id = ${Number(id)}`)
      .getOne();

    if (!result) {
      throw new HttpException(ErrorEnum.InvalidData, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  async getCurrentProduct(id: string) {
    try {
      const product = await this.getProductById(id);
      const filePath = path.join(
        __dirname,
        `../../../public/productsInfo/${(product as Product).itemId}.json`,
      );
      return fs.readFileSync(filePath, 'utf8');
    } catch (e) {
      throw new HttpException(ErrorEnum.InvalidData, HttpStatus.BAD_REQUEST);
    }
  }

  getNewProducts() {
    return this.productRepository
      .createQueryBuilder('product')
      .orderBy(`product.year`, 'DESC')
      .limit(10)
      .getMany();
  }

  async getDiscountProducts() {
    const products = await this.productRepository
      .createQueryBuilder('product')
      .where('product.price != product.fullPrice')
      .limit(100)
      .getMany();

    return getRandomProducts(products);
  }

  async getRecommendedProducts(id, query: IProductQuery) {
    const { productType } = query;

    const lastProducts = await this.productRepository
      .createQueryBuilder('product')
      .orderBy('product.id', 'DESC')
      .where({
        id: Not(Number(id)),
        category: productType || 'phones',
      })
      .limit(50)
      .getMany();

    return getRandomProducts(lastProducts);
  }
}
