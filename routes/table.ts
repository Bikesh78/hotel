import { Router } from "express";
import { deleteTable, getTables, postTable } from "../controller/table.js";

const router = Router();

router.get("/", getTables);
router.post("/", postTable);
router.delete("/:id", deleteTable);

export { router as tableRouter };
