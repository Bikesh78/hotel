import { Router } from "express";
import { getOrders, placeOrder } from "../controller/order.js";

const router = Router();

router.get("/", getOrders);
router.post("/", placeOrder);
// router.delete("/:id", deleteTable);

export { router as orderRouter };
