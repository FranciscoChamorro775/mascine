// backend/models/Favorito.js
// ─────────────────────────────────────────────────────────────
// NOTA: este archivo necesita el método "existe()" nuevo.
// Añádelo junto a los métodos que ya tienes (agregar, listar, eliminar).
// ─────────────────────────────────────────────────────────────
const db = require("../config/db");

class Favorito {

    // ── NUEVO: comprueba si el favorito ya existe ──────────────
    static async existe(id_usuario, id_pelicula) {
        const [rows] = await db.query(
            "SELECT id_favorito FROM favoritos WHERE id_usuario = ? AND id_pelicula = ? LIMIT 1",
            [id_usuario, id_pelicula]
        );
        return rows.length > 0;
    }

    static async agregar(id_usuario, id_pelicula) {
        const [result] = await db.query(
            "INSERT INTO favoritos (id_usuario, id_pelicula) VALUES (?, ?)",
            [id_usuario, id_pelicula]
        );
        return result.insertId;
    }

    static async listar(id_usuario) {
        const [rows] = await db.query(
            `SELECT f.id_favorito, p.*
             FROM favoritos f
             JOIN peliculas p ON f.id_pelicula = p.id_pelicula
             WHERE f.id_usuario = ?
             ORDER BY f.id_favorito DESC`,
            [id_usuario]
        );
        return rows;
    }

    static async eliminar(id_favorito, id_usuario) {
        const [result] = await db.query(
            "DELETE FROM favoritos WHERE id_favorito = ? AND id_usuario = ?",
            [id_favorito, id_usuario]
        );
        return result.affectedRows;
    }
}

module.exports = Favorito;