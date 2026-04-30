const mysql = require("mysql2/promise");

// Solo cargar .env en desarrollo (local)
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// Debug para comprobar que Railway lee las variables
console.log("HOST:", process.env.MYSQLHOST);
console.log("USER:", process.env.MYSQLUSER);
console.log("PASS:", process.env.MYSQLPASSWORD);
console.log("DB:", process.env.MYSQLDATABASE);
console.log("PORT:", process.env.MYSQLPORT);

const db = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
    ssl: {
        rejectUnauthorized: true
    }
});

module.exports = db;

