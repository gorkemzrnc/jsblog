import catchErrors from "../utils/catch_errors";
import { CategorySchema } from "./category.schema";
import { CategoryDocument } from "../models/category.model";
import UserModel from "../models/user.model";
import { NOT_FOUND, UNAUTHORIZED } from "../constants/http";
import appAssert from "../utils/app_assert";
import CategoryModel from "../models/category.model";

export const getCategories = catchErrors(async (req, res, next) => {
  const categories = await CategoryModel.find();

  if (!categories) {
    return appAssert(!categories, NOT_FOUND, "categories not found");
  }

  return res.json(categories);
});

export const getCategory = catchErrors(async (req, res, next) => {
  const { id } = req.params;
  console.log(req.params);
  const category = CategoryModel.findById(id);

  appAssert(category, NOT_FOUND, "Category is not found");

  return res.json(category);
});

export const getCategoriesById = catchErrors(async (req, res, next) => {
  const { ids } = req.query;
  console.log(ids);
  const idArray = typeof ids === 'string' ? ids.split(',') : [];
  console.log(idArray);
  const categories = await CategoryModel.find({
    _id: { $in: idArray }
  });
  console.log(categories)
  console.log(categories.length)
  appAssert(categories.length > 0, NOT_FOUND, "categories not found");

  return res.json(categories);
});

export const addCategory = catchErrors(async (req, res, next) => {
  const user = await UserModel.findById(req.userId);

  if (!user) {
    return appAssert(user, UNAUTHORIZED, "admin is not authorizedd");
  }

  if (user.role !== "admin") {
    return appAssert(false, UNAUTHORIZED, "admin is not authorized");
  }

  const { categoryName } = CategorySchema.parse(<CategoryDocument>req.body);

  const category = await CategoryModel.create({ categoryName });

  return res.json({
    "message": category
  });
});
