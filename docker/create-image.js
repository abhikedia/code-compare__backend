const Docker = require("dockerode");
const docker = new Docker();
const start = require("./utils/attach-and-start");

global.docker = docker;

const cmd = [
  "sh",
  "-c",
  "apt-get update && apt-get install -y python3 gcc g++",
];

docker.createContainer(
  {
    Image: "ubuntu:latest",
    Cmd: cmd,
    Tty: true,
    AttachStdout: true,
    AttachStderr: true,
  },
  function (err, container) {
    if (err) {
      return console.log(err);
    }

    start(container, true);
  }
);
