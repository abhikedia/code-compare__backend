const { exec } = require("child_process");

// The command to run the shell script
const c = "chmod +x ./scripts/install-docker.sh";
const command = "sudo ./scripts/install-docker.sh";

exec(c);

// Execute the command
const child = exec(command);

// Print the output of the command
child.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

// Print the errors, if any
child.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

// Print a message when the command exits
child.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});
