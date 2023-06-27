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
    .then(() => {
      const userCodesDir = "./user-codes";
      if (!fs.existsSync(userCodesDir)) fs.mkdirSync(userCodesDir);

      const tarDir = "./user-codes/tar";
      if (!fs.existsSync(tarDir)) fs.mkdirSync(tarDir);
    })
    .catch((e) => logger.fatal("Error starting the application:", e));
});

process.once("SIGINT", exitHandler);
process.once("SIGUSR2", exitHandler);
