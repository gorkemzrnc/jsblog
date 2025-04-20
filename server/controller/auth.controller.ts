import { Request, Response, NextFunction } from "express";
import { CreateUserSchema, UserLoginSchema } from "./auth.schema";
import { createAccount, loginUser, refreshUserAccessToken } from "../services/auth.service";
import { CreateAccountParams } from "../dto/user.dto";
import { BAD_REQUEST, OK, UNAUTHORIZED } from "../constants/http";
import { clearAuthCookies, getAccessTokenCookieOptions, getRefreshTokenCookieOptions, setAuthCookies } from "../utils/cookies";
import catchErrors from "../utils/catch_errors";
import { AccessTokenPayload, refreshTokenSignOptions, signToken, verifyToken } from "../utils/jwt";
import SessionModel from "../models/session.model";
import appAssert from "../utils/app_assert";
import axios from "axios";
import UserModel from "../models/user.model";

 
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

export const deleteAllSessionsHandler = catchErrors(async (req, res, next) => {
  await SessionModel.deleteMany({});
  return res.status(OK).json({ message: "All sessions deleted successfully" });
});

export const googleAuth = catchErrors(async (req, res) => {
  try {
    const { code } = req.query;

    // Token exchange
    const { data: { access_token } } = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code,
      redirect_uri: 'http://localhost:8000/oauth2/redirect/google',
      grant_type: 'authorization_code'
    });

    // Profil bilgilerini al
    const { data: profile } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    // Kullanıcıyı bul/oluştur
    let user = await UserModel.findOne({
      $or: [{ email: profile.email }, { googleId: profile.id }]
    });

    if (!user) {
      user = await UserModel.create({
        authMethods: ['google'],
        googleId: profile.id,
        email: profile.email,
        username: profile.name,
        avatar: profile.picture
      });
    }
    console.log('helloo!!!');
    appAssert(user, UNAUTHORIZED, "missing refresh token or invalid refresh token.");

    const session = await SessionModel.create({ userId: user._id });
    const refreshToken = signToken({ sessionId: session._id }, refreshTokenSignOptions);
    const accessToken = signToken({ sessionId: session._id, userId: user._id });

    return setAuthCookies({ res, accessToken, refreshToken })
      .status(OK)
      .redirect('http://localhost:5173');
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
});