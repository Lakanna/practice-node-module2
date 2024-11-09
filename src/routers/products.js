import { Router } from 'express';
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
  updateContactController,
  upsertProductController,
} from '../controllers/products.js';
import { ctrlCatchErrors } from '../utils/ctrlCatchErrors.js';
import { validateBody } from '../middlewares/validatebody.js';
import {
  createProductShcema,
  updateProductShcema,
} from '../validation/products.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/', authenticate, ctrlCatchErrors(getAllProductsController));

router.get(
  '/:productId',
  authenticate,
  isValidId,
  ctrlCatchErrors(getProductByIdController),
);

router.post(
  '/',
  authenticate,
  validateBody(createProductShcema),
  ctrlCatchErrors(createProductController),
);

router.patch(
  '/:productId',
  authenticate,
  isValidId,
  validateBody(updateProductShcema),
  ctrlCatchErrors(updateContactController),
);

router.put(
  '/:productId',
  authenticate,
  isValidId,
  validateBody(createProductShcema),
  ctrlCatchErrors(upsertProductController),
);

router.delete(
  '/:productId',
  authenticate,
  isValidId,
  ctrlCatchErrors(deleteProductController),
);

export default router;
