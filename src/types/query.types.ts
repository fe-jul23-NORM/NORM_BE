export interface IProductAllQuery {
  perPage?: string;
  page?: string;
  sortBy?: SortProductByEnum;
  query?: string;
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
