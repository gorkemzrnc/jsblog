import { Request, Response, NextFunction } from "express";

import { CreateUserSchema, UserLoginSchema } from "./auth.schema";
import { createAccount, loginUser, refreshUserAccessToken } from "../services/auth.service";
import { CreateAccountParams } from "../dto/user.dto";
import { BAD_REQUEST, OK, UNAUTHORIZED } from "../constants/http";
import { clearAuthCookies, getAccessTokenCookieOptions, getRefreshTokenCookieOptions, setAuthCookies } from "../utils/cookies";
import catchErrors from "../utils/catch_errors";
import { AccessTokenPayload, refreshTokenSignOptions, verifyToken } from "../utils/jwt";
import SessionModel from "../models/session.model";
import appAssert from "../utils/app_assert";


export const registerHandler = catchErrors(async (req, res) => {
  const request = CreateUserSchema.safeParse(<CreateAccountParams>req.body);

  if (!request.success) {
    const errorMessages = request.error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
    return res.status(BAD_REQUEST).json({ message: "Invalid input", details: errorMessages });
  }

  const { data } = request;
  const { user, accessToken, refreshToken } = await createAccount(data);

  setAuthCookies({ res, accessToken, refreshToken });

  return res.json(user).status(OK);
});

export const loginHandler = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  const request = UserLoginSchema.safeParse(req.body);

  if (!request.success) {
    const errorMessages = request.error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
    return res.status(BAD_REQUEST).json({ message: "Invalid input", details: errorMessages });
  }

  const { data } = request;
  const { accessToken, refreshToken, user } = await loginUser(data);
  return setAuthCookies({ res, accessToken, refreshToken }).status(OK).json({ "message": { accessToken, refreshToken, user } })
});

export const logoutHandler = catchErrors(async (req, res, next) => {
  const accessToken = req.cookies.accessToken as string | undefined;

  const { payload } = verifyToken<AccessTokenPayload>(accessToken || "");

  if (payload) {
    await SessionModel.findByIdAndDelete(payload.sessionId);
  }

  return clearAuthCookies(res).status(OK).json({ "message": "logout successfull" });
});

export const refreshTokenHandler = catchErrors(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken as string | undefined;

  appAssert(refreshToken, UNAUTHORIZED, "missing refresh token or invalid refresh token.");

  const { accessToken, newRefreshToken } = await refreshUserAccessToken(refreshToken);

  if (newRefreshToken) res.cookie("refreshTooken", refreshToken, getRefreshTokenCookieOptions());

  return res.status(OK).cookie("accessToken", accessToken, getAccessTokenCookieOptions()).json({
    accessToken, newRefreshToken
  });
});