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

export const createProduct = async (payload) => {
  const newProduct = await ProductsCollection.create(payload);

  return newProduct;
};

export const updateProduct = async (productId, payload, options = {}) => {
  const product = await ProductsCollection.findOneAndUpdate(
    { _id: productId },
    payload,
    {
      returnDocument: 'after',
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  // console.log(options, 'options incoming in services');
  // console.log(product, 'product in services');
  if (!product || !product.value) return null;

  return { product: product.value, isNew: product?.lastErrorObject?.upserted };
};

// 6714fe4f6a15b989ff9584f7
