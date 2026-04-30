const mysql = require("mysql2/promise");
require("dotenv").config();

console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);

const db = mysql.createPool({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "mascine"
});

module.exports = db;
