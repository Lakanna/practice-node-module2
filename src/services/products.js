import { ProductsCollection } from '../db/models.js';

export const getAllProducts = async () => {
  const products = await ProductsCollection.find();

  return products;
};
