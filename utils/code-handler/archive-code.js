const fs = require("fs");
const tar = require("tar");
const logger = require("../../logger/initialize");

const archiveCode = async (uuid, userCode) => {
  logger.info(`Attempting to archive code: ${uuid}`);
  const { code, language } = userCode;

  return new Promise((resolve, reject) => {
    fs.writeFile(`./user-codes/${uuid}.${language}`, code, (err) => {
      if (err) console.log(err);
      else {
        tar
          .c(
            {
              gzip: true,
              file: `./user-codes/tar/${uuid}.tar`,
            },
            [`./user-codes/${uuid}.${language}`]
          )
          .then(() => {
            logger.info(`Successfully archived: ${uuid}`);
            resolve();
          })
          .catch(() => {
            logger.error(`Failed to archive: ${uuid}`);
            reject();
          });
      }
    });
  });
};

module.exports = archiveCode;
