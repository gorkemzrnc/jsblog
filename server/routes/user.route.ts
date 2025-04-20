import { Router } from "express";
import authenticate from "../middleware/authenticate";
import { getAllUserHandler, getUserByIdHandler, getUserHandler, updateUserHandler } from "../controller/user.controller";
import { uploadImages } from "../middleware/upload";

const userRouter = Router();

userRouter.get("/all", getAllUserHandler);
userRouter.get("/:id", getUserByIdHandler);
userRouter.get("/", authenticate, getUserHandler);
userRouter.patch("/", authenticate, uploadImages, updateUserHandler);
//userRouter.post("/post", uploadImages, createPost);

export default userRouter;