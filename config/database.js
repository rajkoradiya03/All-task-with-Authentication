const mysql = require('mysql2');
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
    console.log("database: " + error.message);
}

module.exports = connection;