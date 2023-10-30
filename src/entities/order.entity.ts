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

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'varchar', enum: OrderStatusEnum })
  status: Date;

  @Column({ type: 'varchar', length: 255 })
  user_email: string;

  @OneToMany(() => Order_Product, (orderProduct) => orderProduct.order)
  products: Order_Product[];
}
