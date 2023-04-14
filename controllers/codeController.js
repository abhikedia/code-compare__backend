const { v4: uuidv4 } = require("uuid");
const executeCode = require("../docker/code-execution/execute");
const archiveCode = require("../utils/code-handler/archive-code");
const hexAndAsciiToString = require("../utils/hexToAscii");

const compileCode = async (req, res) => {
  try {
    const { code1, code2, input } = req.body;
    const uuid1 = uuidv4();
    const uuid2 = uuidv4();
    let response = {};

    archiveCode(uuid1, code1).then(() =>
      executeCode(uuid1, code1.language, input).then((result) => {
        response.code1 = {
          output: result.output,
          time: result.time,
        };

        archiveCode(uuid2, code2).then(() =>
          executeCode(uuid2, code2.language, input).then((result) => {
            response.code2 = {
              output: result.output,
              time: result.time,
            };

            res.status(200).json({
              status: "success",
              data: response,
              message: "code executed!",
            });
          })
        );
      })
    );
  } catch (e) {
    res.status(400).json({
      status: "error",
      message: "Something went wrong: " + e,
    });
  }
};

module.exports = compileCode;
