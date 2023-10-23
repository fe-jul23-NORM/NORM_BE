import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', enum: ['phones', 'tablets', 'accessories'] })
  category: string;

  @Column({ type: 'varchar', length: 255 })
  phoneId: string;

  @Column({ type: 'varchar', length: 255 })
  itemId: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int' })
  fullPrice: number;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'varchar', length: 255 })
  screen: string;

  @Column({ type: 'varchar', length: 255 })
  capacity: string;

  @Column({ type: 'varchar', length: 255 })
  color: string;

  @Column({ type: 'varchar', length: 255 })
  ram: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'varchar', length: 255 })
  image: string;
}
