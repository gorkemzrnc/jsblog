import appAssert from "../utils/app_assert";
import catchErrors from "../utils/catch_errors";
import UserModel from "../models/user.model";
import { NOT_FOUND, OK, UNAUTHORIZED } from "../constants/http";
import { UserSchema } from "./user.schema";

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

export const createUserHandler = catchErrors(async (req, res, next) => {
  const validatedData = UserSchema.parse(req.body);
  const user = await UserModel.create(validatedData);
  return res.status(201).json(user.omitPassword());
});

export const updateUserHandler = catchErrors(async (req, res, next) => {
  const user = await UserModel.findById(req.userId);
  appAssert(user, NOT_FOUND, "user not found");

  const updateData = UserSchema.partial().parse(req.body);
  
  let image = user.image;
  if (req.files && 'profileImage' in req.files && req.files['profileImage'].length > 0) {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    image = `/uploads/${files['profileImage'][0].filename}`;
  }

  const updatedUser = await UserModel.findByIdAndUpdate(
    req.userId, 
    { ...updateData, image }, 
    { new: true }
  );
  
  appAssert(updatedUser, NOT_FOUND, "User update failed, user not found");
  return res.status(OK).json(updatedUser.omitPassword());
});

export const getUserByIdHandler = catchErrors(async (req, res, next) => {
  const id = req.params.id;
  const user = await UserModel.findById(id);
  appAssert(user, NOT_FOUND, "user not found");
  return res.status(OK).json(user.toObject());
});