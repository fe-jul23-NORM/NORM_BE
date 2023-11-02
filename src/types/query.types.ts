export interface ProductAllQuery {
  perPage?: string;
  page?: string;
  sortBy?: SortProductByEnum;
  query?: string;
  productType: string;
}

export interface ProductQuery {
  productType: string;
}

export interface ProductByNameQuery {
  name: string;
}

export enum SortProductByEnum {
  Age = 'age',
  Name = 'name',
  Price = 'price',
}

export enum ProductTypeEnum {
  Phones = 'phones',
  Tablets = 'tablets',
  Accessories = 'accessories',
}

export const VALID_SORT_BY = [
  SortProductByEnum.Age,
  SortProductByEnum.Name,
  SortProductByEnum.Price,
];
