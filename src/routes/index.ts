import { Router } from "express";
import { CategoryRouter } from "./Category.js";
import { ItemsRouter } from "./Items.js";
import { SubCategoryRouter } from "./SubCategory.js";
export const router = Router();
router.use("/category",CategoryRouter);
router.use("/subcategory",SubCategoryRouter);
router.use("/items",ItemsRouter);