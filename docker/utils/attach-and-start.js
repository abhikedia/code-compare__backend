const logger = require("../../logger/initialize");
const saveImage = require("./save-image");

const start = (container, creatingImage = false) => {
  container.attach(
    { stream: true, stdout: true, stderr: true },
    function (err, stream) {
      if (err) {
        logger.fatal("Failed to attach container", err);
        return;
      }

      container.start(function (err, data) {
        if (err) {
          logger.fatal("Failed to start the container", err);
          return;
        }
        logger.info("Container started successfully");
        stream.pipe(process.stdout);

        creatingImage &&
          container.wait(() => {
            saveImage(container);
          });
      });
    }
  );
};

module.exports = start;
