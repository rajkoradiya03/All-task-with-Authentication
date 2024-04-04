const pino = require('pino');

module.exports = pino({
  timestamp: () => `, "timestamp": "${new Date(Date.now())}"`,
  formatters: {
    level: (lable)=>{
      return {level: lable.toUpperCase()}
    }
  },
});