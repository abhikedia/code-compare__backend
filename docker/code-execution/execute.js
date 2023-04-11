const commands = require("./commands");

const executeCode = async (code, language, uuid, input) => {
  const container = global.docker.getContainer(global.containerId);
  let result = {
    time: "",
    output: "",
  };

  return new Promise((resolve, reject) => {
    container.exec(
      {
        Cmd: [
          "/bin/bash",
          "-c",
          commands.executionCommands(code, language, uuid, input),
        ],
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
            result.time = chunk.toString();
          });
          stream.on("end", () => {
            exec.inspect((err, data) => {
              if (err) {
                return reject(err);
              }
              if (!data.Running) {
                container.exec(
                  {
                    Cmd: [
                      "/bin/bash",
                      "-c",
                      commands.removalCommands(language, uuid),
                    ],
                    AttachStdout: true,
                    AttachStderr: true,
                  },
                  (err, exec) => {
                    exec.start((err, stream2) => {
                      stream2.on("data", function (chunk) {
                        result.output = chunk.toString();
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
  });
};

module.exports = executeCode;
