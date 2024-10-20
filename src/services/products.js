import { ProductsCollection } from '../db/models.js';

export const getAllProducts = async () => {
  const products = await ProductsCollection.find();

  return products;
};

export const getProductById = async (productId) => {
  const product = await ProductsCollection.findById(productId);

  //   console.log(product, 'product in services');

  return product;
};

// 6714fe4f6a15b989ff9584f7
