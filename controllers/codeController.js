const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const executeCode = require("../docker/code-execution/c++");

const compileCode = async (req, res) => {
  try {
    const { language, code } = req.body;
    const uuid = uuidv4();

    executeCode(code, language, uuid);

    res.status(200).json({
      status: "success",
      // data: result,
      message: "code executed!",
    });
  } catch (e) {
    res.status(400).json({
      status: "error",
      message: "Something went wrong: " + e,
    });
  }
};

module.exports = compileCode;
