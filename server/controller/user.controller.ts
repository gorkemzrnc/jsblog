import { NextFunction, Request, Response } from "express";
import appAssert from "../utils/app_assert";
import catchErrors from "../utils/catch_errors";
import UserModel from "../models/user.model";
import { NOT_FOUND, OK, UNAUTHORIZED } from "../constants/http";

export const getUserHandler = catchErrors(async (req, res, next) => {
  const user = await UserModel.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(OK).json(user.toObject());
});

export const getAllUserHandler = catchErrors(async (req, res, next) => {
  const user = await UserModel.findById(req.userId);
  appAssert(user, NOT_FOUND, "user not found");
  appAssert(user.role == "admin", UNAUTHORIZED, "user not authorized");
  const allUsers = await UserModel.find();
  return res.status(OK).json(allUsers);
});

export const updateUserHandler = catchErrors(async (req, res, next) => {
  const user = await UserModel.findById(req.userId);
  appAssert(user, NOT_FOUND, "user not found");
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const image = `/uploads/${files['profileImage'][0].filename}`;
  console.log(image);
  const updatedUser = await UserModel.findByIdAndUpdate(req.userId, { ...req.body, image }, { new: true });
  if (!updatedUser) {
    return res.status(NOT_FOUND).json({ message: "User update failed, user not found" });
  }
  return res.status(OK).json(updatedUser.toObject());
});