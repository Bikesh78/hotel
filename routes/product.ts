import express from "express";
import {
  deleteProduct,
  getProduct,
  postProduct,
} from "../controller/product.js";

const router = express.Router();

router.get("/", getProduct);
router.post("/", postProduct);
router.delete("/:id", deleteProduct);

export { router as productRouter };
