const logger = require("../../logger/initialize");

const cleanCode = async (uuid, language) => {
  const fsPromises = require("fs").promises;

  try {
    const codeFilePath = `./user-codes/${uuid}.${language}`;
    await fsPromises.unlink(codeFilePath);

    const tarFilePath = `./user-codes/tar/${uuid}.tar`;
    await fsPromises.unlink(tarFilePath);

    logger.info(`Successfully deleted archived files for: ${uuid}`);
  } catch (error) {
    logger.warn(`Failed to delete archived files for: ${uuid}: ${error}`);
  }
};

module.exports = cleanCode;
