import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderProductDto } from './order-product.dto';
import { ErrorEnum } from '../types/errors.types';

export class UserOrderDto {
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1, { message: ErrorEnum.EmptyCard })
  @Type(() => OrderProductDto)
  readonly products: OrderProductDto[];
}
