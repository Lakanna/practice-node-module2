import Joi from 'joi';

export const createProductShcema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  price: Joi.number().required(),
  category: Joi.string().valid('books', 'electronics', 'clothing', 'other'),
  description: Joi.string(),
  userId: Joi.string().required(),
});

export const updateProductShcema = Joi.object({
  name: Joi.string().min(3).max(30),
  price: Joi.number(),
  category: Joi.string().valid('books', 'electronics', 'clothing', 'other'),
  description: Joi.string(),
  userId: Joi.string().required(),
});
