import express from 'express';
import cors from 'cors';

import { env } from './utils/env.js';
import {
  getAllProductsController,
  getProductByIdController,
} from './controllers/products.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get('/products', getAllProductsController);

  app.get('/products/:productId', getProductByIdController);

  app.use('*/*', (req, res, _next) => {
    res.status(404).json({ status: 404, message: 'Route not found' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
