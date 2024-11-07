import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/users.js';

import bcrypt from 'bcrypt';

export const registerUser = async (payload) => {
  const userExist = await UsersCollection.findOne({ email: payload.email });

  if (userExist) throw createHttpError(409, 'Email in use');

  const encryptedPass = await bcrypt.hash(payload.password, 10);

  const user = await UsersCollection.create({
    ...payload,
    password: encryptedPass,
  });

  return user;
};
