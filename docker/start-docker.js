const Docker = require("dockerode");
const docker = new Docker();
const fs = require("fs");
const start = require("./utils/attach-and-start");

global.docker = docker;

const loadDockerImage = async () => {
  const imageTar = fs.readFileSync("./code-compare-docker-image.tar");

  docker.loadImage(imageTar, function (err, stream) {
    if (err) {
      return console.log(err);
    }

    return stream.on("end", function () {
      console.log("Image loaded successfully");
      return "1";
    });
  });
};

const startContainer = async () => {
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
        global.containerId = container.id;
        start(container);
      }
    );
  });
};

module.exports = startContainer;
