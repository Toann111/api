const express = require("express");
const exitHook = require("async-exit-hook");
const { CONNECT_DB, CLOSE_DB } = require("./config/mongodb");
const { env } = require("./config/environment");
const { APIs_V1 } = require("./routes/v1"); // Corrected import
const {
  errorHandlingMiddleware,
} = require("./middlewares/errorHandlingMiddleware");

const START_SERVER = () => {
  const app = express();

  app.use(express.json());

  app.use("/v1", APIs_V1); // Updated route

  app.get("/", async (req, res) => {
    res.send("API is running");
  });

  app.use(errorHandlingMiddleware);

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Server is running at http://${env.APP_HOST}:${env.APP_PORT}/`);
  });

  exitHook(() => {
    console.log("Server is shutting down...");
    CLOSE_DB();
    console.log("Disconnected from MongoDB Cloud Atlas");
  });
};

(async () => {
  try {
    console.log("Connecting to MongoDB Cloud Atlas...!");
    await CONNECT_DB();
    console.log("Connected to MongoDB Cloud Atlas!");

    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();
