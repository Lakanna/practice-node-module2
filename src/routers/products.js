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

const router = Router();

router.get('/', ctrlCatchErrors(getAllProductsController));

router.get('/:productId', isValidId, ctrlCatchErrors(getProductByIdController));

router.post(
  '/',
  validateBody(createProductShcema),
  ctrlCatchErrors(createProductController),
);

router.patch(
  '/:productId',
  isValidId,
  validateBody(updateProductShcema),
  ctrlCatchErrors(updateContactController),
);

router.put(
  '/:productId',
  isValidId,
  validateBody(createProductShcema),
  ctrlCatchErrors(upsertProductController),
);

router.delete(
  '/:productId',
  isValidId,
  ctrlCatchErrors(deleteProductController),
);

export default router;
