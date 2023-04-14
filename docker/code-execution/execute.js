const commands = require("./commands");
const fs = require("fs");

const runCommandInContainer = (
  container,
  result,
  resolve,
  executionCommand,
  removalCommand
) => {
  container.exec(
    {
      Cmd: ["/bin/bash", "-c", executionCommand],
      AttachStdout: true,
      AttachStderr: true,
    },
    function (err, exec) {
      if (err) {
        return reject(err);
      }
      exec.start(function (err, stream) {
        if (err) {
          return reject(err);
        }
        stream.on("data", function (chunk) {
          result.time = chunk;
        });
        stream.on("end", () => {
          exec.inspect((err, data) => {
            if (err) {
              return reject(err);
            }
            if (!data.Running) {
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

                    stream2.on("end", () => resolve(result));
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
