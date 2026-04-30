// backend/models/Favorito.js
const pool = require("../config/db");

class Favorito {

    static async agregar(id_usuario, id_pelicula) {
        const sql = `
            INSERT INTO favoritos (id_usuario, id_pelicula)
            VALUES (?, ?)
        `;
        const [result] = await pool.query(sql, [id_usuario, id_pelicula]);
        return result.insertId;
    }

    static async listar(id_usuario) {
        const sql = `
            SELECT f.id_favorito, p.*
            FROM favoritos f
            INNER JOIN peliculas p ON p.id_pelicula = f.id_pelicula
            WHERE f.id_usuario = ?
        `;
        const [rows] = await pool.query(sql, [id_usuario]);
        return rows;
    }

    static async eliminar(id_favorito, id_usuario) {
        const sql = `
            DELETE FROM favoritos
            WHERE id_favorito = ? AND id_usuario = ?
        `;
        const [result] = await pool.query(sql, [id_favorito, id_usuario]);
        return result.affectedRows;
    }
}

module.exports = Favorito;
