import app from "./app.js";
import { PORT } from "./utils/config.js";
import { connectToDatabase } from "./utils/db.js";

const startApp = async () => {
  await connectToDatabase();
  app
    .listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
    .on("error", (err) => console.log(`error connecting ${err}`));
};

startApp();
