import { getAllProducts } from '../services/products.js';

export const getAllProductsController = async (req, res) => {
  try {
    const productsList = await getAllProducts();

    if (!productsList) {
      res.status(404).json({ status: 404, message: 'Products not found' });
    }

    res.status(200).json({ status: 200, data: productsList });
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
