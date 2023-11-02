import { Global, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { Equal, Not, Repository } from 'typeorm';
import {
  ProductAllQuery,
  ProductQuery,
  SortProductByEnum,
  VALID_SORT_BY,
} from '../../types/query.types';
import * as path from 'path';
import * as fs from 'fs';
import { ErrorEnum } from '../../types/errors.types';
import { getRandomProducts } from '../../helpers/products.helper';
import { Favorite_Product } from '../../entities/favorite_product.entity';

@Global()
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Favorite_Product)
    private readonly favoriteProductRepository: Repository<Favorite_Product>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAll(productQuery: ProductAllQuery) {
    const { query, page, perPage, sortBy, productType } = productQuery;
    let currentPage = Number(page);

    try {
      const queryBuilder = this.productRepository
        .createQueryBuilder('product')
        .where('product.category = :category', { category: productType });

      if (sortBy && VALID_SORT_BY.includes(sortBy)) {
        if (sortBy === SortProductByEnum.Age) {
          queryBuilder.orderBy('product.year', 'DESC');
          queryBuilder.addOrderBy('product.id', 'ASC');
        } else {
          queryBuilder.orderBy(`product.${sortBy}`, 'DESC');
        }
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

  async getByQuery(query: string) {
    if (!query) {
      throw new HttpException(ErrorEnum.InvalidData, HttpStatus.BAD_REQUEST);
    }

    const result = await this.productRepository
      .createQueryBuilder('product')
      .where('LOWER(product.name) LIKE :name', {
        name: `%${query.toLowerCase()}%`,
      })
      .limit(6)
      .getMany();

    if (!result) {
      throw new HttpException(ErrorEnum.InvalidData, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  async getCategoryCount() {
    const results = await this.productRepository
      .createQueryBuilder()
      .select('category, COUNT(*) as count')
      .groupBy('category')
      .getRawMany();

    const categoryCounts = {};

    results.forEach((result) => {
      categoryCounts[result.category] = parseInt(result.count);
    });

    return categoryCounts;
  }

  async getById(id: string) {
    const result = await this.productRepository
      .createQueryBuilder('product')
      .where({
        itemId: id,
      })
      .getOne();

    if (!result) {
      throw new HttpException(ErrorEnum.InvalidData, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  async getCurrent(id: string) {
    try {
      const product = await this.getById(id);
      const filePath = path.join(
        __dirname,
        `../../../../public/productsInfo/products.json`,
      );
      const data = fs.readFileSync(filePath, 'utf8');
      const jsonArray = JSON.parse(data);
      const foundProduct = jsonArray.find((item) => item.id === product.itemId);

      return { ...foundProduct, productPassport: product };
    } catch (e) {
      throw new HttpException(
        ErrorEnum.UndefinedProduct,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  getNew() {
    return this.productRepository
      .createQueryBuilder('product')
      .orderBy(`product.year`, 'DESC')
      .limit(10)
      .getMany();
  }

  async getDiscount() {
    const products = await this.productRepository
      .createQueryBuilder('product')
      .where('product.price != product.fullPrice')
      .limit(100)
      .getMany();

    return getRandomProducts(products);
  }

  async getRecommended(id, query: ProductQuery) {
    const { productType } = query;

    const lastProducts = await this.productRepository
      .createQueryBuilder('product')
      .orderBy('product.id', 'DESC')
      .where({
        itemId: Not(id),
        category: productType || 'phones',
      })
      .limit(50)
      .getMany();

    return getRandomProducts(lastProducts);
  }

  async addToFavorite(req, id) {
    const product = await this.productRepository.findOneBy({ id });
    const alreadyAdded = await this.favoriteProductRepository.findOneBy({
      product: Equal(id),
      user: Equal(req.user.id),
    });

    if (!product) {
      throw new HttpException(
        ErrorEnum.UndefinedProduct,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (alreadyAdded) {
      throw new HttpException(
        ErrorEnum.AlreadyInFavorites,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newFavorite = await this.favoriteProductRepository.insert({
      product: id,
      user: req.user.id,
    });

    return this.favoriteProductRepository
      .createQueryBuilder('favorite_product')
      .where({ id: newFavorite.raw[0].id })
      .leftJoinAndSelect('favorite_product.product', 'product')
      .getOne();
  }

  async removeFromFavorite(req, id) {
    const product = await this.favoriteProductRepository.findOneBy({
      product: Equal(id),
      user: Equal(req.user.id),
    });

    if (!product) {
      throw new HttpException(
        ErrorEnum.UndefinedProduct,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.favoriteProductRepository.delete({
      id: product.id,
    });

    return product.id;
  }

  async getFavorites(req) {
    const favoriteProducts = await this.favoriteProductRepository
      .createQueryBuilder('favorite_product')
      .where({ user: req.user.id })
      .leftJoinAndSelect('favorite_product.product', 'product')
      .getMany();

    return favoriteProducts.map((item) => item.product);
  }
}
