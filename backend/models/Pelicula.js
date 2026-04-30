const db = require("../config/db");

/**
 * Modelo Pelicula
 * ----------------
 * Representa la tabla 'peliculas' en la base de datos.
 * Cada método devuelve una Promesa para poder usar async/await en el controlador.
 */

const Pelicula = {

    /**
     * Obtener todas las películas
     */
    getAll: async () => {
        try {
            const [results] = await db.query("SELECT * FROM peliculas");
            return results;
        } catch (err) {
            throw err;
        }
    },

    /**
     * Obtener una película por ID
     */
    getById: async (id) => {
        try {
            const [results] = await db.query(
                "SELECT * FROM peliculas WHERE id_pelicula = ?",
                [id]
            );
            return results[0];
        } catch (err) {
            throw err;
        }
    },

    /**
     * Obtener estrenos (películas con fecha_estr)
     */
    getEstrenos: async () => {
         try {
            const [results] = await db.query(
                "SELECT * FROM peliculas WHERE fecha_estr IS NOT NULL ORDER BY fecha_estr ASC"
            );
            return results;
        } catch (err) {
            throw err;
        }
    },


    /**
     * Crear una película
     */
    create: async (data) => {
        try {
            const [results] = await db.query(
                "INSERT INTO peliculas SET ?",
                [data]
            );
            return results;
        } catch (err) {
            throw err;
        }
    },

    /**
     * Actualizar una película
     */
    update: async (id, data) => {
        try {
            const [results] = await db.query(
                "UPDATE peliculas SET ? WHERE id_pelicula = ?",
                [data, id]
            );
            return results;
        } catch (err) {
            throw err;
        }
    },

    /**
     * Eliminar una película
     */
    delete: async (id) => {
        try {
            const [results] = await db.query(
                "DELETE FROM peliculas WHERE id_pelicula = ?",
                [id]
            );
            return results;
        } catch (err) {
            throw err;
        }
    }
};

module.exports = Pelicula;

