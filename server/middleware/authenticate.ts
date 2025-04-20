import { RequestHandler } from "express";
import appAssert from "../utils/app_assert";
import AppErrorCode from "../constants/app_error_code";
import { UNAUTHORIZED } from "../constants/http";
import { verifyToken } from "../utils/jwt";
import mongoose from "mongoose";
import User, { UserDocument } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
      userId?: mongoose.Types.ObjectId;
      sessionId?: mongoose.Types.ObjectId;
    }
  }
}

const authenticate: RequestHandler = async (req, res, next) => {
  const accessToken = req.cookies.accessToken as string | undefined;
  try {
    appAssert(
      accessToken,
      UNAUTHORIZED,
      "Not authorized",
      AppErrorCode.InvalidAccessToken,
    );
  
    const { error, payload } = verifyToken(accessToken);
  
    appAssert(
      payload,
      UNAUTHORIZED,
      error === "jwt expired" ? "Token expired" : "Invalid token",
      AppErrorCode.InvalidAccessToken,
    );
  
    const user = await User.findById(payload.userId).select("-password");
  
    appAssert(
      user,
      UNAUTHORIZED,
      "User not found",
      AppErrorCode.InvalidAccessToken,
    );
  
    req.user = await User.findById(payload.userId).select("-password");
    req.userId = new mongoose.Types.ObjectId(payload.userId as string);
    req.sessionId = new mongoose.Types.ObjectId(payload.sessionId as string);
    next();
  } catch (err) {
    next(err);
  }
};

export default authenticate;
