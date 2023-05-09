const logger = require("../logger/initialize");

const exitHandler = async () => {
  const containers = await global.docker.listContainers();

  logger.info("Attempting to shut down containers");
  for (const containerInfo of containers) {
    try {
      logger.info(`Stopping container: ${containerInfo.Id}`);
      const container = global.docker.getContainer(containerInfo.Id);
      await container.stop();
      logger.info(`Stopping stopped: ${containerInfo.Id}`);
      await container.remove();
      logger.info(`Stopping removed: ${containerInfo.Id}`);
    } catch (err) {
      logger.warn(`Error shutting down containers: ${err.reason}`);
    }
  }
  logger.info("Container shutdown completed.");
  process.exit(0);
};

module.exports = exitHandler;
