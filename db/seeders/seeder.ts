import { seeder } from 'nestjs-seeder';
import { ProductSeeder } from './product.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Product } from '../../src/entities/product.entity';
import { TypeOrmConfigService } from '../../src/config/config';

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
