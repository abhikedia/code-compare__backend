const exitHandler = () => {
  global.docker.listContainers(function (err, containers) {
    console.log("Shutting down containers");
    containers.forEach(async function (containerInfo) {
      global.docker
        .getContainer(containerInfo.Id)
        .stop()
        .then(async () => {
          console.log("Container stopped");
          global.docker
            .getContainer(containerInfo.Id)
            .remove()
            .then(() => {
              console.log("Removed:", containerInfo.Id);
            });
        });
    });
    console.log("Container shutdown completed.");
  });
};

module.exports = exitHandler;
