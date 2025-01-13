import catchErrors from "../utils/catch_errors";
import { CategorySchema } from "./category.schema";
import { CategoryDocument } from "../models/category.model";
import UserModel from "../models/user.model";
import { UNAUTHORIZED } from "../constants/http";
import appAssert from "../utils/app_assert";
import CategoryModel from "../models/category.model";

export const addCategory = catchErrors(async (req, res, next)=>{
  const user = await UserModel.findById(req.userId);

  if(!user) {
    return appAssert(user, UNAUTHORIZED, "admin is not authorizedd");
  }

  if(user.role !== "admin"){
    return appAssert(false, UNAUTHORIZED, "admin is not authorized");
  }

  const { categoryName } = CategorySchema.parse(<CategoryDocument>req.body);

  const category = await CategoryModel.create({categoryName});

  return res.json({
    "message": category
  });
});
