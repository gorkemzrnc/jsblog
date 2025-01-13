import {Router} from "express";
import { addCategory } from "../controller/category.controller";
import authenticate from "../middleware/authenticate";

const CategoryRouter = Router();

CategoryRouter.post("/", authenticate, addCategory);

export default CategoryRouter;