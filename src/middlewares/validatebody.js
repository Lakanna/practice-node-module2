import createHttpError from 'http-errors';

export const validateBody = (schema) => {
  return async (req, res, next) => {
    try {
      const userId = req.user?._id.toString();

      const body = userId ? { ...req.body, userId } : req.body;

      await schema.validateAsync(body, { abortEarly: false });
      next();
    } catch (error) {
      next(
        createHttpError(400, 'Bad request in validateBody', {
          errors: error.details,
        }),
      );
    }
  };
};
