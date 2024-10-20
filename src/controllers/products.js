import { getAllProducts, getProductById } from '../services/products.js';

export const getAllProductsController = async (req, res) => {
  try {
    const productsList = await getAllProducts();

    if (!productsList) {
      res.status(404).json({ status: 404, message: 'Products not found' });
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully found products!',
      data: productsList,
    });
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const getProductByIdController = async (req, res, _next) => {
  try {
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
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
