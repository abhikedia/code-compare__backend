const executionCommands = (language, uuid, input) => {
  switch (language) {
    case "cpp":
      return `cd home/user-codes && echo ${input} > ${uuid}.txt && g++ ${uuid}.cpp -o ${uuid} && TIMEFORMAT=%R && time ./${uuid} < ${uuid}.txt > ${uuid}-output.txt`;

    case "python":
      return `cd home && echo -e '${code}' > ${uuid}.py && echo ${input} > ${uuid}.txt && chmod +x ./${uuid}.py && TIMEFORMAT=%R && time python3 ${uuid}.py < ${uuid}.txt > ${uuid}-output.txt`;
  }
};

const removalCommands = (language, uuid) => {
  switch (language) {
    case "cpp":
      return `cd /home/user-codes && cat ${uuid}-output.txt && cd .. && rm -r user-codes`;

    case "python":
      return `cd /home && cat ${uuid}-output.txt && rm ${uuid}.py && rm ${uuid}.txt && rm ${uuid}-output.txt`;
  }
};

module.exports = {
  executionCommands,
  removalCommands,
};
