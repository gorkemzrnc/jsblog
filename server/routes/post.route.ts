import { Router } from "express";
import { createBlog, getBlog, getBlogsByCategory, paginateBlogs } from "../controller/post.controller";
import { uploadImages } from "../middleware/upload";

const blogRouter = Router();

blogRouter.get("/:id", getBlog);
blogRouter.get("/", paginateBlogs);
blogRouter.get("/:id/children", getBlogsByCategory);
blogRouter.post("/", uploadImages, createBlog);

export default blogRouter;