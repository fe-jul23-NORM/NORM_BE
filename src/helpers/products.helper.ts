import { Product } from '../entities/product.entity';

export function getRandomProducts(products: Product[]) {
  const productsArr = [...products];
  const result = [];

  if (products.length <= 10) {
    return products;
  }

  while (result.length < 10) {
    const randIndex = Math.floor(Math.random() * productsArr.length);
    result.push(productsArr[randIndex]);
    productsArr.splice(randIndex, 1);
  }

  return result;
}
