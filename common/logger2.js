const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint} = format;
// require('winston-daily-rotate-file');

// const fileDailyRotate = new transports.DailyRotateFile({
//   filename: 'log/Date-%DATE%.log',
//   datePattern: 'YYYY-MM-DD',
//   maxFiles: "2d",
// })

const logger = createLogger({
  level: "info",
  format: combine(
    timestamp({
      format: "DD-MM-YYYY  HH:MM:SS"
    }),
    prettyPrint()
  ),
  transports: [
    new transports.File({
      filename: "log/logfile.log"
    })
  ],
})

module.exports = logger;