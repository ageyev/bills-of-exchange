import path from "node:path";
import { format, transports, createLogger } from "winston";

const createWinstonLogger = (logFileName: string) => {

  const logFilePath = path.join(__dirname, logFileName);

  // https://github.com/winstonjs/winston#formats
  const myFormat = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
    format.printf(({ level, message, label, timestamp }) => {
      return `[${timestamp}][${level}][${label}] ${message}`;
    })
  );

  return createLogger({
      format: myFormat,
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize({
              all: true
            })
          )
        }),
        new transports.File({
          filename: logFilePath
        })
      ]

    }
  );

};

export default createWinstonLogger;