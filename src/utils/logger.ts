import logger from "pino";
import dayjs from "dayjs";
import pino from "pino";

const log = pino({
  transport: {
    target: "pino-pretty",
    options: {
      levelFirst: true,
      translateTime: true,
      colorize: true,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
  },
});

export default log;
