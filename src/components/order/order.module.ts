import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from '../../entities/order.entity';
import { Order_Product } from '../../entities/order_product.entity';
import { Product } from '../../entities/product.entity';

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  imports: [
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([Order_Product]),
  ],
})
export class OrderModule {}
