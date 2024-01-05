import { Router } from "express";
import {
  deleteCategories,
  getCategories,
  postCategories,
} from "../controller/category.js";

const router = Router();

router.get("/", getCategories);
router.post("/", postCategories);
router.delete("/:id", deleteCategories);

export { router as categoryRouter };
