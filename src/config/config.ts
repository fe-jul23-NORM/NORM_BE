import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { Token } from '../entities/token.entity';
import { User } from '../entities/user.entity';
import { Order_Product } from '../entities/order_product.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: +this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: [Product, User, Token, Order_Product, Order],
      // url: this.configService.get<string>('DB_URL'),
      // ssl: true,
      synchronize: false,
    };
  }
}
