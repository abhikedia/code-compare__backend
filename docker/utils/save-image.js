const fs = require("fs");

const saveImage = (container) => {
  container.commit({ repo: "code-compare-docker-image" }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("Image created successfully:", data.Id);
      const image = global.docker.getImage("code-compare-docker-image");
      image.get((err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const stream = fs.createWriteStream("code-compare-docker-image.tar");
        stream.write(data.toString("utf8"));
        stream.end();
        console.log("Image saved!");
      });
    }
  });
};

module.exports = saveImage;
