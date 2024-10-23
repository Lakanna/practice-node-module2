import createHttpError from 'http-errors';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from '../services/products.js';

export const getAllProductsController = async (req, res) => {
  const productsList = await getAllProducts();

  if (!productsList) {
    res.status(404).json({ status: 404, message: 'Products not found' });
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully found products!',
    data: productsList,
  });
};

export const getProductByIdController = async (req, res, _next) => {
  const { productId } = req.params;
  console.log(productId, 'prod id');

  const product = await getProductById(productId);

  if (!product) {
    res.status(404).json({ status: 404, message: 'Product not found' });
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found product with id ${productId}!`,
    data: product,
  });
};

export const createProductController = async (req, res, next) => {
  const body = req.body;
  console.log(body, 'body in create product');

  const product = await createProduct(body);

  if (!product) {
    const error = createHttpError(404, 'Something went wrong');
    next(error);
  }

  res.status(201).json({
    status: 201,
    message: 'Successfully create a new product',
    data: product,
  });
};

export const updateContactController = async (req, res, _next) => {
  const { productId } = req.params;
  const body = req.body;

  const product = await updateProduct(productId, body);
  // console.log(product, 'product in controller');
  if (!product)
    res.status(404).json({
      status: 404,
      message: `Product whith id ${productId} not found`,
    });

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a product!',
    data: product.product,
  });
};

export const upsertProductController = async (req, res, _next) => {
  const { productId } = req.params;
  const body = req.body;

  const product = await updateProduct(productId, body, { upsert: true });

  const status = product.isNew ? 201 : 200;

  res.status(status).json({
    status: status,
    message: 'Successfully upsert product',
    data: product.product,
  });
};
