import express from "express";
import {
  createRole,
  createUser,
  getRoles,
  getUsers,
} from "../controller/user.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/roles", createRole);
router.get("/roles", getRoles);
router.post("/sign-up", createUser);

export { router as userRouter };
