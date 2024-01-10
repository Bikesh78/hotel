import { Router } from "express";
import { getOrders, postOrder } from "../controller/order.js";

const router = Router();

router.get("/", getOrders);
router.post("/", postOrder);
// router.delete("/:id", deleteTable);

export { router as orderRouter };
