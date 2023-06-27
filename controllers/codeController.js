const executeCode = require("../docker/code-execution/execute");
const logger = require("../logger/initialize");
const archiveCode = require("../utils/code-handler/archive-code");

const compileCode = async (req, res) => {
  logger.info("Compile code function called");

  const { code1, code2, input } = req.body;
  const date = new Date().getTime();
  const uuid1 = `code-1_${date}_${code1.language}`;
  const uuid2 = `code-2_${date}_${code2.language}`;
  logger.info(`Generated ids for code: ${uuid1}, ${uuid2}`);
  let response = {};

  archiveCode(uuid1, code1)
    .then(() =>
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

            console.log(response)

            res.status(200).json({
              status: "success",
              data: response,
              message: "code executed!",
            });
          })
        );
      })
    )
    .catch((error) => {
      res.status(400).json({
        status: "error",
        message: "Something went wrong: " + error,
      });
    });
};

module.exports = compileCode;
