import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../src/entities/product.entity';
import { PRODUCTS } from '../data/products';

@Injectable()
export class ProductSeeder implements Seeder {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  drop(): Promise<any> {
    return this.productRepository.delete({});
  }

  seed(): Promise<any> {
    return this.productRepository
      .createQueryBuilder()
      .insert()
      .values(PRODUCTS)
      .execute();
  }
}
