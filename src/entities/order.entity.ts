import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order_Product } from './order_product.entity';
import { User } from './user.entity';
import { OrderStatusEnum } from '../types/order.types';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from './product.entity';

@Entity()
export class Order {
  @ApiProperty({
    description: 'The unique id of order',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ApiProperty({
    description: 'Date of order creation',
    example: '2023-11-02 10:46:51.662',
  })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({
    description: 'Status of order',
    example: 'created',
  })
  @Column({ type: 'varchar', enum: OrderStatusEnum })
  status: Date;

  @ApiProperty({
    description: 'User email',
    example: 'test@gmail.com',
  })
  @Column({ type: 'varchar', length: 255 })
  user_email: string;

  @ApiProperty({
    description: 'array of products',
    type: [Product],
    example: [
      {
        screen: 'IPS 3.2',
        capacity: '32 GB',
        category: 'phones',
        color: 'green',
        fullPrice: 1200,
        image: 'img/phones/apple-iphone-11-pro-max/midnightgreen/00.webp',
        itemId: 'apple-iphone-11-pro-max-256gb-midnightgreen',
        name: 'Apple iPhone 11 Pro Max 256GB Midnightgreen',
        ram: '4GB',
        price: 999,
        year: 2018,
        id: 1,
      },
    ],
  })
  @OneToMany(() => Order_Product, (orderProduct) => orderProduct.order)
  products: Order_Product[];
}
