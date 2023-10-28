import { IsInt, Min } from 'class-validator';
import { ErrorEnum } from '../types/errors.types';

export class OrderProductDto {
  @IsInt({ message: ErrorEnum.InvalidData })
  @Min(1)
  readonly productId: number;

  @IsInt({ message: ErrorEnum.InvalidData })
  @Min(1)
  readonly quantity: number;
}
