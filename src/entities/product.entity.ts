import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product {
  @ApiProperty({
    description: 'Unique id of product',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Product category',
    example: 'phones',
  })
  @Column({ type: 'varchar', enum: ['phones', 'tablets', 'accessories'] })
  category: string;

  @ApiProperty({
    description: 'Product slug',
    example: 'apple-iphone-12--32gb-green',
  })
  @Column({ type: 'varchar', length: 255 })
  itemId: string;

  @ApiProperty({
    description: 'Product name',
    example: 'Apple Iphone 12 32GB Green',
  })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({
    description: 'Full price of product',
    example: 1200,
  })
  @Column({ type: 'int' })
  fullPrice: number;

  @ApiProperty({
    description: 'Current price of product',
    example: 799,
  })
  @Column({ type: 'int' })
  price: number;

  @ApiProperty({
    description: 'Product screen',
    example: 'IPS 5.2',
  })
  @Column({ type: 'varchar', length: 255 })
  screen: string;

  @ApiProperty({
    description: 'Product capacity',
    example: '32 GB',
  })
  @Column({ type: 'varchar', length: 255 })
  capacity: string;

  @ApiProperty({
    description: 'Product color',
    example: 'green',
  })
  @Column({ type: 'varchar', length: 255 })
  color: string;

  @ApiProperty({
    description: 'Product ram',
    example: '8gb',
  })
  @Column({ type: 'varchar', length: 255 })
  ram: string;

  @ApiProperty({
    description: 'Product year',
    example: 2016,
  })
  @Column({ type: 'int' })
  year: number;

  @ApiProperty({
    description: 'Link to product image',
    example: 'img/phones/apple-iphone-12.png',
  })
  @Column({ type: 'varchar', length: 255 })
  image: string;
}
