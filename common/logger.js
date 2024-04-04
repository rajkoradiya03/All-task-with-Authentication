const pino = require('pino');

const savedLog = pino.transport({
  target: 'pino/file',
  options: {
    destination: 'log/logfile.log' 
  }
}) 

module.exports = pino({
  timestamp: () => `, "timestamp": "${new Date(Date.now())}"`,
  formatters: {
    level: (lable)=>{
      return {level: lable.toUpperCase()}
    }
  },
}, savedLog); 