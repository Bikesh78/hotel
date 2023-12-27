import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user.js";
import { errorHandler } from "./utils/middleware.js";
import { authRouter } from "./routes/auth.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api", authRouter);

app.use(errorHandler);

export default app;
