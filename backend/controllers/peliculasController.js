const Pelicula = require("../models/Pelicula");

/**
 * Controlador de Películas
 * ------------------------
 * Contiene las funciones que responden a las rutas.
 * Cada método usa async/await y devuelve JSON al frontend.
 */

const peliculasController = {

    /**
     * Obtener todas las películas
     * ---------------------------
     * GET /peliculas
     * Devuelve un array con todas las películas.
     */
    getAllPeliculas: async (req, res) => {
        try {
            const peliculas = await Pelicula.getAll();
            res.json(peliculas);
        } catch (error) {
            console.error("Error al obtener películas:", error);
            res.status(500).json({ error: "Error al obtener películas" });
        }
    },

    /**
     * Obtener una película por ID
     * ---------------------------
     * GET /peliculas/:id
     * Devuelve una sola película o 404 si no existe.
     */
    getPeliculaById: async (req, res) => {
        try {
            const { id } = req.params;
            const pelicula = await Pelicula.getById(id);

            if (!pelicula) {
                return res.status(404).json({ error: "Película no encontrada" });
            }

            res.json(pelicula);
        } catch (error) {
            console.error("Error al obtener película:", error);
            res.status(500).json({ error: "Error al obtener película" });
        }
    },

    /**
     * Crear una película
     * ------------------
     * POST /peliculas
     * Recibe un JSON con los datos y lo inserta.
     */
    createPelicula: async (req, res) => {
        try {
            const data = req.body;
            const result = await Pelicula.create(data);

            res.json({
                message: "Película creada correctamente",
                id_insertado: result.insertId
            });
        } catch (error) {
            console.error("Error al crear película:", error);
            res.status(500).json({ error: "Error al crear película" });
        }
    },

    /**
     * Actualizar una película
     * -----------------------
     * PUT /peliculas/:id
     */
    updatePelicula: async (req, res) => {
        try {
            const { id } = req.params;
            const data = req.body;

            const result = await Pelicula.update(id, data);

            res.json({
                message: "Película actualizada correctamente",
                cambios: result.affectedRows
            });
        } catch (error) {
            console.error("Error al actualizar película:", error);
            res.status(500).json({ error: "Error al actualizar película" });
        }
    },

    /**
     * Eliminar una película
     * ---------------------
     * DELETE /peliculas/:id
     */
    deletePelicula: async (req, res) => {
        try {
            const { id } = req.params;

            const result = await Pelicula.delete(id);

            res.json({
                message: "Película eliminada correctamente",
                eliminados: result.affectedRows
            });
        } catch (error) {
            console.error("Error al eliminar película:", error);
            res.status(500).json({ error: "Error al eliminar película" });
        }
    },

    /**
     * Obtener estrenos
     * ----------------
     * GET /estrenos
     */
    getEstrenos: async (req, res) => {
        try {
            const estrenos = await Pelicula.getEstrenos();
            res.json(estrenos);
        } catch (error) {
            console.error("Error al obtener estrenos:", error);
            res.status(500).json({ error: "Error al obtener estrenos" });
        }
    }

};

module.exports = peliculasController;






