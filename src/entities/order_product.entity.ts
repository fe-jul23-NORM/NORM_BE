import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Order } from './order.entity';

@Entity()
export class Order_Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @ManyToOne(() => Order, (order) => order.products)
  order: Order;

  @Column()
  quantity: number;
}
