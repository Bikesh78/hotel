import { Router } from "express";
import { getVariation } from "../controller/variation.js";

const router = Router();

router.get("/", getVariation);
// router.post("/", postTable);
// router.delete("/:id", deleteTable);

export { router as variationRouter };
