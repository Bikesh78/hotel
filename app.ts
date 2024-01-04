import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user.js";
import { authMiddleware, errorHandler } from "./utils/middleware.js";
import { authRouter } from "./routes/auth.js";
import { categoryRouter } from "./routes/category.js";
import { productRouter } from "./routes/product.js";
import { floorRouter } from "./routes/floor.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", authRouter);

app.use(authMiddleware);

app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/floor", floorRouter);

app.use(errorHandler);

export default app;
