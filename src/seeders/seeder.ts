import { seeder } from 'nestjs-seeder';
import { ProductSeeder } from './product.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from '../config/config';

seeder({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([Product]),
  ],
}).run([ProductSeeder]);
