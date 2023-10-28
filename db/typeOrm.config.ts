import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Product } from '../src/entities/product.entity';
import { User } from '../src/entities/user.entity';
import { Token } from '../src/entities/token.entity';
import { Order_Product } from '../src/entities/order_product.entity';
import { Order } from '../src/entities/order.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: +configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [User, Token, Order, Order_Product, Product],
  // url: configService.get<string>('DB_URL'),
  // ssl: true,
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
});
