import createHttpError from 'http-errors';

export const notFoundErrorHandler = (req, _res, _next) => {
  throw createHttpError(404, `Route ${req.url} not found`);
};
