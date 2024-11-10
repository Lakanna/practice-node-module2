import { Router } from 'express';
import { validateBody } from '../middlewares/validatebody.js';
import { loginUserShcema, UsersShcema } from '../validation/users.js';
import { ctrlCatchErrors } from '../utils/ctrlCatchErrors.js';
import {
  loginUserController,
  registerUsersController,
  refreshUserController,
  logoutUserCintroller,
} from '../controllers/users.js';

const router = Router();

router.post(
  '/register',
  validateBody(UsersShcema),
  ctrlCatchErrors(registerUsersController),
);

router.post(
  '/login',
  validateBody(loginUserShcema),
  ctrlCatchErrors(loginUserController),
);

router.post('/refresh', ctrlCatchErrors(refreshUserController));

router.post('/logout', ctrlCatchErrors(logoutUserCintroller));

export default router;
