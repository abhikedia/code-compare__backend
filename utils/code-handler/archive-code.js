const fs = require("fs");
const tar = require("tar");

const archiveCode = async (uuid, userCode) => {
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
            console.log("Created");
            resolve();
          });
      }
    });
  });
};

module.exports = archiveCode;
