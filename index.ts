import express from "express";
import { PORT } from "./utils/config.js";
import { connectToDatabase } from "./utils/db.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const startApp = async () => {
  await connectToDatabase();
  app.listen(PORT, () => `Server running on PORT ${PORT}`);
};

startApp();
