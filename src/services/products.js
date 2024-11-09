import { ProductsCollection } from '../db/models/products.js';

export const getAllProducts = async (filter = {}, userId) => {
  const productsQuery = ProductsCollection.find({ userId });

  if (filter.category) {
    productsQuery.where('category').equals(filter.category);
  }

  if (filter.minPrice) {
    productsQuery.where('price').gte(filter.minPrice);
  }

  if (filter.maxPrice) {
    productsQuery.where('price').lte(filter.maxPrice);
  }

  const products = await productsQuery.exec();

  return products;
};

export const getProductById = async ({ productId, userId }) => {
  const product = await ProductsCollection.findOne({ _id: productId, userId });

  //   console.log(product, 'product in services');

  return product;
};

export const createProduct = async ({ payload, userId }) => {
  const newProduct = await ProductsCollection.create({ ...payload, userId });

  return newProduct;
};

export const updateProduct = async (
  { productId, payload, userId },
  options = {},
) => {
  const product = await ProductsCollection.findOneAndUpdate(
    { _id: productId, userId },
    payload,
    {
      returnDocument: 'after',
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

export const deleteProduct = async ({ productId, userId }) => {
  return await ProductsCollection.findOneAndDelete({ _id: productId, userId });
};
