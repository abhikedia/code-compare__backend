const { v4: uuidv4 } = require("uuid");
const executeCode = require("../docker/code-execution/c++");
const hexAndAsciiToString = require("../utils/hexToAscii");

const compileCode = async (req, res) => {
  try {
    const { language, code, input } = req.body;
    const uuid = uuidv4();

    const result = await executeCode(code, language, uuid, input);

    res.status(200).json({
      status: "success",
      data: {
        output: hexAndAsciiToString(result.output),
        time: hexAndAsciiToString(result.time),
      },
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
