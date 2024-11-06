import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  const { productId } = req.params;

  const isValidId = isValidObjectId(productId);

  if (!isValidId) throw createHttpError(400, 'This is not valid Id');
  next();
};
