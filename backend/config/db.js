const mysql = require("mysql2/promise");

// Cargar .env SOLO si existe (local). En Railway NO existe.
try {
    require("dotenv").config();
} catch (e) {
    console.log("No .env file loaded (production mode)");
}

// Debug para ver qué variables está usando Railway
console.log("MYSQLHOST:", process.env.MYSQLHOST);
console.log("MYSQLUSER:", process.env.MYSQLUSER);
console.log("MYSQLPASSWORD:", process.env.MYSQLPASSWORD);
console.log("MYSQLDATABASE:", process.env.MYSQLDATABASE);
console.log("MYSQLPORT:", process.env.MYSQLPORT);

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
