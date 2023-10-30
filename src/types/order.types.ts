export enum OrderStatusEnum {
  Created = 'created',
  Processing = 'processing',
  Shipped = 'shipped',
  Refunded = 'refunded',
  Canceled = 'canceled',
}

export interface OrderProduct {
  productId: number;
  quantity: number;
}
