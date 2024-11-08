import { ProductsCollection } from '../db/models/products.js';

export const getAllProducts = async (filter = {}) => {
  const productsQuery = ProductsCollection.find();

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

export const deleteProduct = async (_id) => {
  return await ProductsCollection.findOneAndDelete({ _id });
};
