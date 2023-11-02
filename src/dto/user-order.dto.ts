import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderProductDto } from './order-product.dto';
import { ErrorEnum } from '../types/errors.types';
import { ApiProperty } from '@nestjs/swagger';

export class UserOrderDto {
  @ApiProperty({
    description: 'The array of product id and quantity',
    example: [
      {
        productId: 12,
        quantity: 1,
      },
      {
        productId: 4,
        quantity: 4,
      },
    ],
  })
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1, { message: ErrorEnum.EmptyCard })
  @Type(() => OrderProductDto)
  readonly products: OrderProductDto[];
}
