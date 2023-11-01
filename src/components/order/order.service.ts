import { Global, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Order } from '../../entities/order.entity';
import { Order_Product } from '../../entities/order_product.entity';
import { Product } from '../../entities/product.entity';
import { ErrorEnum } from '../../types/errors.types';
import { OrderStatusEnum } from '../../types/order.types';

@Global()
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Order_Product)
    private readonly orderProductRepository: Repository<Order_Product>,
  ) {}

  async create(req, dto) {
    const { products } = dto;
    const productIds = products.map((item) => item.productId);
    const productsFromDb = await this.productRepository.findBy({
      id: In(productIds),
    });

    if (productsFromDb.length !== products.length) {
      return new HttpException(ErrorEnum.InvalidData, HttpStatus.BAD_REQUEST);
    }

    const newOrder = await this.orderRepository.insert({
      user_email: req?.user?.email || dto.email,
      createdAt: new Date(),
      user: req?.user?.id || null,
      status: OrderStatusEnum.Created,
    });

    const orderId = newOrder.raw[0].id;

    await this.orderProductRepository.insert(
      products.map((item) => {
        return {
          ...item,
          product: item.productId,
          order: orderId,
          quantity: item.quantity,
        };
      }),
    );

    return this.orderRepository
      .createQueryBuilder('order')
      .where({ id: orderId })
      .leftJoinAndSelect('order.products', 'order_product')
      .leftJoinAndSelect('order_product.product', 'product')
      .getOne();
  }

  getForUser(req) {
    return this.orderRepository
      .createQueryBuilder('order')
      .where({ user: req.user.id })
      .leftJoinAndSelect('order.products', 'order_product')
      .leftJoinAndSelect('order_product.product', 'product')
      .orderBy('order.createdAt', 'DESC')
      .getMany();
  }
}
