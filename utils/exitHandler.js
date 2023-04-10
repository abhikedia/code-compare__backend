const exitHandler = async () => {
  try {
    const containers = await global.docker.listContainers();
    console.log("Shutting down containers");
    for (const containerInfo of containers) {
      const container = global.docker.getContainer(containerInfo.Id);
      await container.stop();
      console.log("Container stopped");
      await container.remove();
      console.log("Removed:", containerInfo.Id);
    }
    console.log("Container shutdown completed.");
  } catch (err) {
    console.error("Error shutting down containers:", err);
  }
};

module.exports = exitHandler;
