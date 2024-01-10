import express from "express";
import cors from "cors";
import { authMiddleware, errorHandler } from "./utils/middleware.js";
import {
  authRouter,
  categoryRouter,
  customerRouter,
  floorRouter,
  orderRouter,
  productRouter,
  tableRouter,
  userRouter,
} from "./routes/index.js";
import { variationRouter } from "./routes/variation.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// public routes
app.use("/api", authRouter);

app.use(authMiddleware);

// private routes
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/variation", variationRouter);
app.use("/api/floor", floorRouter);
app.use("/api/table", tableRouter);
app.use("/api/customer", customerRouter);
app.use("/api/order", orderRouter);

app.use(errorHandler);

export default app;
