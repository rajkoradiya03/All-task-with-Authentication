const mysql = require('mysql2');
const logger = require('../common/logger');
require('dotenv').config();

let connection;

try {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    }).promise();
} catch (error) {
    logger.error("database connection error : " + error.message);
}

module.exports = connection;