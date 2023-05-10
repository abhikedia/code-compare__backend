require("dotenv").config();

const express = require("express");
const codeRouter = require("./routes/codeRouter");
const healthRouter = require("./routes/health-check");
const startContainer = require("./docker/start-docker");
const exitHandler = require("./utils/exitHandler");
var cors = require("cors");
const logger = require("./logger/initialize");
const app = express();
const fs = require("fs");

app.use(cors());
app.use(express.json());
app.use("/api/v1/code", codeRouter);
app.use("/ping", healthRouter);

const port = 4000;

app.listen(port, async () => {
  startContainer()
    .then(() => logger.info(`started on port:${port}`))
    .then(() =>
      fs.mkdir("./user-codes", (err) => {
        if (err) logger.fatal(`Failed to create user-codes directory: ${err}`);
        else {
          fs.mkdir("./user-codes/tar");
          logger.info("Created user-codes directory");
        }
      })
    )
    .catch((e) => logger.fatal("Error starting the application:", e));
});

process.once("SIGINT", exitHandler);
process.once("SIGUSR2", exitHandler);
