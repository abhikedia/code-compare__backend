require("dotenv").config();
const express = require("express");
const codeRouter = require("./routes/codeRouter");
const startContainer = require("./docker/start-docker");
const path = require("path");
const exitHandler = require("./utils/exitHandler");
const app = express();

app.use(express.json());
app.use("/api/v1/code", codeRouter);

const port = process.env.PORT;

app.listen(port, async () => {
  try {
    startContainer().then(() => console.log(`started on port:${port}`));
  } catch (e) {
    console.log("Error starting the application:", e);
  }
});

process.once("SIGINT", exitHandler);
