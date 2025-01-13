import { BAD_REQUEST, UNAUTHORIZED } from "../constants/http";
import { CreateAccountParams, LoginAccountParams } from "../dto/user.dto";
import SessionModel from "../models/session.model";
import UserModel from "../models/user.model";
import appAssert from "../utils/app_assert";
import { ONE_DAY_MS, thirtyDaysFromNow } from "../utils/date";
import { refreshTokenSignOptions, signToken, verifyToken } from "../utils/jwt";


export const createAccount = async ({ email, username, password }: CreateAccountParams) => {
  const existingUser = await UserModel.exists({ email });

  appAssert(!existingUser, BAD_REQUEST, "Email already in use");

  const user = await UserModel.create({
    username,
    email,
    password,
  });

  const session = await SessionModel.create({ userId: user._id });
  const refreshToken = signToken({ sessionId: session._id }, refreshTokenSignOptions);
  const accessToken = signToken({ sessionId: session._id, userId: user._id });

  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken
  }
}

export const loginUser = async ({ email, password }: LoginAccountParams) => {
  const user = await UserModel.findOne({ email });

  appAssert(user, BAD_REQUEST, "Invalid email or password");
  
  const isPasswordValid = await user.comparePassword(password);

  appAssert(isPasswordValid, BAD_REQUEST, "Invalid email or password");

  const session = await SessionModel.create({ userId: user._id });
  const sessionInfo = { sessionId: session._id };
  const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);
  const accessToken = signToken({ ...sessionInfo, userId: user._id });

  return { accessToken, refreshToken, user: user.omitPassword() };
};

export const refreshUserAccessToken = async (refreshToken: string) => {
  const { payload } = verifyToken(refreshToken, {
    secret: refreshTokenSignOptions.secret,
  });

  appAssert(payload, UNAUTHORIZED, "Invalid refresh token");

  const session = await SessionModel.findById(payload.sessionId);
  const now = Date.now();
  appAssert(
    session && session.expiresAt.getTime() > now,
    UNAUTHORIZED,
    "Session expired"
  );

  // refresh the session if it expires in the next 24 hours
  const sessionNeedsRefresh = session.expiresAt.getTime() - now <= ONE_DAY_MS;

  if (sessionNeedsRefresh) {
    session.expiresAt = thirtyDaysFromNow();
    await session.save();
  }

  const newRefreshToken = sessionNeedsRefresh
    ? signToken(
        {
          sessionId: session._id,
        },
        refreshTokenSignOptions
      )
    : undefined;

  const accessToken = signToken({
    userId: session.userId,
    sessionId: session._id,
  })

  return {
    accessToken,
    newRefreshToken,
  };
}
