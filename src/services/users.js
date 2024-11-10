import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/users.js';

import bcrypt from 'bcrypt';
import { SessionsCollection } from '../db/models/sessions.js';
import { randomBytes } from 'crypto';
import { FIFTIN_MINUTES, ONE_MONTH } from '../constants/users.js';

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

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  const accessTokenValidUntil = new Date(Date.now() + FIFTIN_MINUTES);
  const refreshTokenValidUntil = new Date(Date.now() + ONE_MONTH);
  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  };
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(401, 'User not found');
  }

  const passwordIsValid = bcrypt.compare(payload.password, user.password);
  if (!passwordIsValid) throw createHttpError(401, 'Not authorized');

  await SessionsCollection.findOneAndDelete({ userId: user._id });

  const newSession = createSession();

  const session = await SessionsCollection.create({
    userId: user._id,
    ...newSession,
  });

  return session;
};

export const refreshUser = async ({ sessionId, refreshToken }) => {
  const prevSession = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!prevSession) throw createHttpError(401, 'Session not found');

  const isRefreshTokenExpired =
    new Date() > new Date(prevSession.refreshTokenValidUntil);

  if (isRefreshTokenExpired) throw createHttpError(401, 'RefreshToken expired');

  const session = createSession();

  await SessionsCollection.findOneAndDelete({ _id: sessionId, refreshToken });

  const newSession = await SessionsCollection.create({
    userId: prevSession.userId,
    ...session,
  });

  return newSession;
};

export const logoutUser = async (sessionId) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
  });

  if (!session) throw createHttpError(401, 'Session not found');

  const deletedSession = await SessionsCollection.findOneAndDelete({
    _id: sessionId,
  });

  return deletedSession;
};
