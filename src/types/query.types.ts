export interface IProductAllQuery {
  perPage?: string;
  page?: string;
  sortBy?: SortProductByEnum;
  query?: string;
  productType: string;
}

export interface IProductQuery {
  productType: string;
}

export enum SortProductByEnum {
  Age = 'age',
  Name = 'name',
  Price = 'price',
}

export const VALID_SORT_BY = [
  SortProductByEnum.Age,
  SortProductByEnum.Name,
  SortProductByEnum.Price,
];
