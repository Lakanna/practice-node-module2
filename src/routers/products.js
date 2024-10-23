import { Router } from 'express';
import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  updateContactController,
  upsertProductController,
} from '../controllers/products.js';
import { ctrlCatchErrors } from '../utils/ctrlCatchErrors.js';

export const router = Router();

router.get('/products', ctrlCatchErrors(getAllProductsController));

router.get('/products/:productId', ctrlCatchErrors(getProductByIdController));

router.post('/products', ctrlCatchErrors(createProductController));

router.patch('/products/:productId', ctrlCatchErrors(updateContactController));

router.put('/products/:productId', ctrlCatchErrors(upsertProductController));
