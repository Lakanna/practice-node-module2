import { Router } from 'express';
import { validateBody } from '../middlewares/validatebody.js';
import { UsersShcema } from '../validation/users.js';
import { ctrlCatchErrors } from '../utils/ctrlCatchErrors.js';
import { registerUsersController } from '../controllers/users.js';

const router = Router();

router.post(
  '/register',
  validateBody(UsersShcema),
  ctrlCatchErrors(registerUsersController),
);

export default router;
