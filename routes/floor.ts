import { Router } from "express";
import { deleteFloor, getFloors, postFloor } from "../controller/floor.js";

const router = Router();

router.get("/", getFloors);
router.post("/", postFloor);
router.delete("/:id", deleteFloor);

export { router as floorRouter };
