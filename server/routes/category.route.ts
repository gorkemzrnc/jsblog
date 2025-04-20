import {Router} from "express";
import { addCategory, getCategories, getCategoriesById, getCategory } from "../controller/category.controller";
import authenticate from "../middleware/authenticate";

const CategoryRouter = Router();

CategoryRouter.get("/", getCategories);
CategoryRouter.get("/by-ids", getCategoriesById)
CategoryRouter.get("/:id", getCategory);
CategoryRouter.post("/", authenticate, addCategory);

export default CategoryRouter;