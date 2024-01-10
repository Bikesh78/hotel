import { Router } from "express";
import { cancelOrder, getOrders, placeOrder } from "../controller/order.js";

const router = Router();

router.get("/", getOrders);
router.post("/", placeOrder);
router.patch("/:id", cancelOrder);

export { router as orderRouter };
