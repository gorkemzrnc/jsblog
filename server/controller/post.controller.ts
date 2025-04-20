import catchErrors from "../utils/catch_errors";
import Post from "../models/post.model";
import { NextFunction, Request, Response } from "express";
import appAssert from "../utils/app_assert";
import { NOT_FOUND, OK } from "../constants/http";

export const createBlog = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { title, content, categories, userId } = req.body;

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  console.log(files)
  const thumbnailImage = files['thumbnailImage'][0]?.filename;
  console.log(thumbnailImage);
  const postImages = files['postImages'] ? files['postImages'].map((file) => file.path) : [];
  console.log(categories);
  const newPost = await Post.create({ title, content, category: categories, postImages, thumbnailImage, userId });
  return res.status(201).json({ "message": newPost });
});

export const paginateBlogs = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { page = 1, limit = 10 } = req.query;
  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);
  const total = await Post.countDocuments();
  const results = await Post.find()
    .skip((pageNumber - 1) * limitNumber)
    .limit(limitNumber)
    .exec();

  appAssert(results.length > 0, NOT_FOUND, "No posts found");

  return res.status(OK).json({
    page: pageNumber,
    limit: limitNumber,
    total,
    results,
  });
});

export const getBlog = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  appAssert(id, NOT_FOUND, "ID is required");
  const post = await Post.findById(id);
  appAssert(post, NOT_FOUND, "Post not found");
  return res.status(OK).json(post);
});

export const getBlogsByCategory = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { category } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  const total = await Post.countDocuments({ category });
  const results = await  Post.find({ category })
    .skip((pageNumber - 1) * limitNumber)
    .limit(limitNumber)
    .exec();

  appAssert(results.length > 0, NOT_FOUND, "No posts found in this category");

  return res.status(OK).json({
    page: pageNumber,
    limit: limitNumber,
    total,
    results,
  });
});