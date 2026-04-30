// backend/models/Usuario.js
const pool = require("../config/db");

class Usuario {
    static async crear(nombre, email, passwordHash) {
        const sql = `
            INSERT INTO usuarios (nombre, email, password_hash, fecha_registro)
            VALUES (?, ?, ?, NOW())
        `;
        const [result] = await pool.query(sql, [nombre, email, passwordHash]);
        return result.insertId;
    }

    static async buscarPorEmail(email) {
        const sql = `SELECT * FROM usuarios WHERE email = ? LIMIT 1`;
        const [rows] = await pool.query(sql, [email]);
        return rows[0];
    }

    static async buscarPorId(id_usuario) {
        const sql = `SELECT * FROM usuarios WHERE id_usuario = ? LIMIT 1`;
        const [rows] = await pool.query(sql, [id_usuario]);
        return rows[0];
    }
}

module.exports = Usuario;
