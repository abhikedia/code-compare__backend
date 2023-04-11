const { v4: uuidv4 } = require("uuid");
const executeCode = require("../docker/code-execution/execute");
const hexAndAsciiToString = require("../utils/hexToAscii");

const compileCode = async (req, res) => {
  try {
    const { code1, code2, input } = req.body;
    const uuid1 = uuidv4();
    const uuid2 = uuidv4();

    const result1 = await executeCode(code1.code, code1.language, uuid1, input);
    const result2 = await executeCode(code2.code, code2.language, uuid2, input);

    res.status(200).json({
      status: "success",
      data: {
        code1: {
          output: hexAndAsciiToString(result1.output),
          time: hexAndAsciiToString(result1.time),
        },
        code2: {
          output: hexAndAsciiToString(result2.output),
          time: hexAndAsciiToString(result2.time),
        },
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
