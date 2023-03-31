const saveImage = require("./save-image");

const start = (container, creatingImage = false) => {
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
        stream.pipe(process.stdout);

        creatingImage &&
          container.wait(() => {
            saveImage(container);
          });
      });
    }
  );
};

module.exports = start;
