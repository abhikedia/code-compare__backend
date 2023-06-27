const executionCommands = (language, uuid, input) => {
  switch (language) {
    case "c":
      return `cd home/user-codes && echo '${input}' > ${uuid}.txt && gcc ${uuid}.c -o ${uuid} && time ./${uuid} < ${uuid}.txt > ${uuid}-output.txt`;

    case "cpp":
      return `cd home/user-codes && echo '${input}' > ${uuid}.txt && g++ ${uuid}.cpp -o ${uuid} && time ./${uuid} < ${uuid}.txt > ${uuid}-output.txt`;

    case "py":
      return `cd home/user-codes && echo '${input}' > ${uuid}.txt && time python3 ./${uuid}.py < ${uuid}.txt > ${uuid}-output.txt`;
  }
};

const removalCommands = (language, uuid) => {
  switch (language) {
    case "c":
      return `cd /home/user-codes && cat ${uuid}-output.txt && rm ${uuid}-output.txt && rm ${uuid}.txt && rm ${uuid}.c`;

    case "cpp":
      return `cd /home/user-codes && cat ${uuid}-output.txt && rm ${uuid}-output.txt && rm ${uuid}.txt && rm ${uuid}.cpp`;

    case "py":
      return `cd /home/user-codes && cat ${uuid}-output.txt && rm ${uuid}-output.txt && rm ${uuid}.txt && rm ${uuid}.py`;
  }
};

module.exports = {
  executionCommands,
  removalCommands,
};
