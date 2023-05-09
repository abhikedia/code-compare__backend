const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf, colorize } = format;

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const colors = {
  fatal: "red",
  error: "orange",
  warn: "yellow",
  info: "green",
  debug: "blue",
  trace: "magenta",
};

const logger = createLogger({
  levels: logLevels,
  format: combine(
    colorize({
      all: true,
    }),
    label({
      label: "[LOGGER]",
    }),
    timestamp({
      format: "YY-MM-DD HH:mm:ss.SSS",
    }),
    printf(
      (info) =>
        ` ${info.label} ${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  transports: [new transports.Console()],
});

module.exports = logger;
