const Docker = require("dockerode");
const docker = new Docker();
const fs = require("fs");
const logger = require("../logger/initialize");
const start = require("./utils/attach-and-start");

global.docker = docker;

const loadDockerImage = async () => {
  logger.info("Attempting to load docker image");
  const imageTar = fs.readFileSync("./code-compare-docker-image.tar");

  docker.loadImage(imageTar, function (err, stream) {
    if (err) {
      return console.log(err);
    }

    return stream.on("end", function () {
      logger.info("Image loaded successfully");
      return "1";
    });
  });
};

const startContainer = async () => {
  logger.info("Attempting to start container");
  loadDockerImage().then(() => {
    docker.createContainer(
      {
        Image: "code-compare-docker-image",
        HostConfig: {
          Ulimits: [{ Name: "nofile", Soft: 65535, Hard: 65535 }],
        },
        Cmd: ["/bin/sh", "-c", "tail -f /dev/null"],
        Tty: true,
        AttachStdout: true,
        AttachStderr: true,
      },
      (err, container) => {
        if (err) {
          logger.fatal("Failed while creating container:", err);
          return;
        }

        global.containerId = container.id;
        logger.info(`Container created: ${container.id}`);
        start(container);
      }
    );
  });
};

module.exports = startContainer;
