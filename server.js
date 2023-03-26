require("dotenv").config();
const express = require("express");
const codeRouter = require("./routes/codeRouter");
const app = express();

app.use(express.json());
app.use("/api/v1/code", codeRouter);

const port = process.env.PORT;
app.listen(port, () => console.log(`started on port:${port}`));
