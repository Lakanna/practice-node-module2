import createHttpError from 'http-errors';

export const validateBody = (shcema) => {
  return async (req, res, next) => {
    try {
      await shcema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      next(createHttpError(400, 'Bad request', { errors: error.details }));
    }
  };
};
