const commands = require("./commands");
const logger = require("../../logger/initialize");

const runCommandInContainer = (
  container,
  result,
  resolve,
  executionCommand,
  removalCommand
) => {
  logger.info("Attempting to run execution command");

  container.exec(
    {
      Cmd: ["/bin/bash", "-c", executionCommand],
      AttachStdout: true,
      AttachStderr: true,
    },
    function (err, exec) {
      if (err) {
        logger.error(`Error executing command: ${err}`);
        return reject(err);
      }
      exec.start(function (err, stream) {
        if (err) {
          logger.error(`Error executing command: ${err}`);
          return reject(err);
        }
        stream.on("data", function (chunk) {
          result.time = chunk;
        });
        stream.on("end", () => {
          logger.info("Successfully executed code");
          exec.inspect((err, data) => {
            if (err) {
              logger.error(`Error executing command: ${err}`);
              return reject(err);
            }
            if (!data.Running) {
              logger.info("Attempting to fetch code results");
              container.exec(
                {
                  Cmd: ["/bin/bash", "-c", removalCommand],
                  AttachStdout: true,
                  AttachStderr: true,
                },
                (err, exec) => {
                  exec.start((err, stream2) => {
                    stream2.on("data", function (chunk) {
                      result.output = chunk;
                    });

                    stream2.on("end", () => {
                      logger.info("Code results fetched successfully");
                      resolve(result);
                    });
                  });
                }
              );
            }
          });
        });
      });
    }
  );
};

const executeCode = async (uuid, language, input) => {
  logger.info(`Executing code: ${uuid}`);
  const container = global.docker.getContainer(global.containerId);
  let result = {
    time: "",
    output: "",
  };

  return new Promise((resolve, reject) => {
    container.putArchive(`./user-codes/tar/${uuid}.tar`, {
      path: "/home/",
    });

    const executionCommand = commands.executionCommands(language, uuid, input);
    const removalCommand = commands.removalCommands(language, uuid);
    runCommandInContainer(
      container,
      result,
      resolve,
      executionCommand,
      removalCommand
    );
  });
};

module.exports = executeCode;
