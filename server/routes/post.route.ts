import { Router } from "express";
import { createBlog, paginateBlogs } from "../controller/blog.controller";
import { uploadImages } from "../middleware/upload";

const blogRouter = Router();

blogRouter.get("/", paginateBlogs);
blogRouter.post("/", uploadImages, createBlog);

export default blogRouter;