import { Router } from "express";
import {
  deleteCustomer,
  getCustomers,
  postCustomer,
} from "../controller/customer.js";

const router = Router();

router.get("/", getCustomers);
router.post("/", postCustomer);
router.delete("/:id", deleteCustomer);

export { router as customerRouter };
