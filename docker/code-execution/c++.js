const executeCode = async (code, language, uuid) => {
  const container = global.docker.getContainer(global.containerId);

  container.exec(
    {
      Cmd: [
        "/bin/bash",
        "-c",
        `cd home && echo -e '${code}' > ${uuid}.cpp && g++ ${uuid}.cpp -o ${uuid} && ./${uuid}`,
      ],
      AttachStdout: true,
      AttachStderr: true,
    },
    function (err, exec) {
      if (err) {
        return console.log(err);
      }

      exec.start(function (err, stream) {
        if (err) {
          return console.log(err);
        }
        stream.pipe(process.stdout);
        exec.inspect(function (err, data) {
          if (err) {
            console.log(err);
          } else {
            // container.exec(
            //   {
            //     Cmd: ["/bin/bash", "-c", `cd /home && g++ "${uuid}.cpp"`],
            //     AttachStdout: true,
            //     AttachStderr: true,
            //   },
            //   function (err, exec) {
            //     if (err) {
            //       console.log(err);
            //     } else {
            //       // Start the second command
            //       exec.start(function (err, stream) {
            //         if (err) {
            //           console.log(err);
            //         } else {
            //           // Pipe the output of the second command to the console
            //           stream.pipe(process.stdout);
            //         }
            //       });
            //     }
            //   }
            // );
          }
        });
      });
    }
  );
};

module.exports = executeCode;
