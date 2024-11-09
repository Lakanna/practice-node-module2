import createHttpError from 'http-errors';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from '../services/products.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getAllProductsController = async (req, res) => {
  const { category, minPrice, maxPrice } = parseFilterParams(req.query);

  const userId = req.user._id;

  const productsList = await getAllProducts(
    {
      category,
      minPrice,
      maxPrice,
    },
    userId,
  );

  if (productsList.length === 0) {
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
  const userId = req.user._id;

  const product = await getProductById({ productId, userId });

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
  const userId = req.user._id;
  const payload = req.body;

  const product = await createProduct({ payload, userId });

  if (!product) {
    const error = createHttpError(404, 'Something went wrong');
    next(error);
    return;
  }

  res.status(201).json({
    status: 201,
    message: 'Successfully create a new product',
    data: product,
  });
};

export const updateContactController = async (req, res, _next) => {
  const { productId } = req.params;
  const payload = req.body;
  const userId = req.user._id;

  const product = await updateProduct({ productId, payload, userId });
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
  const payload = req.body;
  const userId = req.user._id;

  const product = await updateProduct(
    { productId, payload, userId },
    { upsert: true },
  );

  const status = product.isNew ? 201 : 200;

  res.status(status).json({
    status: status,
    message: 'Successfully upsert product',
    data: product.product,
  });
};

export const deleteProductController = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  const product = await deleteProduct({ productId, userId });

  if (!product)
    res.status(404).json({
      status: 404,
      message: `Product whith id ${req.params} not found`,
    });

  res.status(204).send();
};
