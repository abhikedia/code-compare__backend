require("dotenv").config();

const express = require("express");
const codeRouter = require("./routes/codeRouter");
const startContainer = require("./docker/start-docker");
const exitHandler = require("./utils/exitHandler");
var cors = require("cors");
const logger = require("./logger/initialize");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/code", codeRouter);

const port = process.env.PORT;

app.listen(port, async () => {
  try {
    startContainer().then(() => logger.info(`started on port:${port}`));
  } catch (e) {
    logger.fatal("Error starting the application:", e);
  }
});

process.once("SIGINT", exitHandler);
process.once("SIGUSR2", exitHandler);
