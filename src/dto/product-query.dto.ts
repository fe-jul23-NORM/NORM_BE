import { ProductTypeEnum, SortProductByEnum } from '../types/query.types';
import { ApiProperty } from '@nestjs/swagger';

export class ProductAllQueryDto {
  @ApiProperty({
    description: 'Amount of products on page',
    example: 4,
    required: false,
  })
  perPage?: string;
  @ApiProperty({
    description: 'Current page',
    example: 4,
    required: false,
  })
  page?: string;
  @ApiProperty({
    description: 'Sort by value',
    enum: SortProductByEnum,
    required: false,
  })
  sortBy?: SortProductByEnum;
  @ApiProperty({
    description: 'Product type',
    enum: ProductTypeEnum,
  })
  productType: string;
}
