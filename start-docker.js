const Docker = require("dockerode");
const docker = new Docker();

global.docker = docker;

const runContainer = () => {
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

      container.attach(
        { stream: true, stdout: true, stderr: true },
        function (err, stream) {
          if (err) {
            return console.log(err);
          }

          container.start(function (err, data) {
            if (err) {
              return console.log(err);
            }

            console.log(data);

            stream.pipe(process.stdout);
          });
        }
      );
    }
  );
};

const startContainer = async () => {
  docker.pull("ubuntu:latest", function (err, stream) {
    if (err) {
      console.log(err);
      return;
    }

    docker.modem.followProgress(stream, onFinished);

    function onFinished(err, output) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Image pulled successfully");
      runContainer();
    }
  });
};

module.exports = startContainer;
