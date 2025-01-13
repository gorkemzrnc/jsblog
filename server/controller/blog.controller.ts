import catchErrors from "../utils/catch_errors";
import Post from "../models/post.model";
import { NextFunction, Request, Response } from "express";
import appAssert from "../utils/app_assert";
import { NOT_FOUND, OK } from "../constants/http";

export const createBlog = catchErrors(async (req, res, next) => {
  const { title, content, category } = req.body;

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  console.log(files)
  const thumbnailImage = files['thumbnailImage'][0].filename;
  console.log(thumbnailImage);
  //const postImages = files['postImages'] ? files['postImages'].map((file) => file.path) : [];
  const newPost = await Post.create({title, content, category, thumbnailImage});
  return res.status(201).json({"message": newPost});
});

export const paginateBlogs = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { page = 1, limit = 10 } = req.query;
  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);
  console.log(pageNumber);
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

export const getPosts = catchErrors(async (req, res, next) => {
  
})

