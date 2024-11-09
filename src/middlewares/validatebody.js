import createHttpError from 'http-errors';

export const validateBody = (schema) => {
  return async (req, res, next) => {
    try {
      const userId = req.user._id.toString();
      const body = { ...req.body, userId };

      await schema.validateAsync(body, { abortEarly: false });
      next();
    } catch (error) {
      next(createHttpError(400, 'Bad request', { errors: error.details }));
    }
  };
};
