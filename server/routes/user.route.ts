import { Router } from "express";
import authenticate from "../middleware/authenticate";
import { getAllUserHandler, getUserHandler, updateUserHandler } from "../controller/user.controller";
import { uploadImages } from "../middleware/upload";

const userRouter = Router();

userRouter.get("/", getUserHandler);
userRouter.get("/all", getAllUserHandler);
userRouter.patch("/update", uploadImages, updateUserHandler);
//userRouter.post("/post", uploadImages, createPost);

export default userRouter;