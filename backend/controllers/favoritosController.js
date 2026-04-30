// backend/controllers/favoritosController.js
const Favorito = require("../models/Favorito");

class FavoritosController {

    static async agregar(req, res) {
        try {
            const { id_pelicula } = req.body;
            const id_usuario = req.usuario.id_usuario; // viene del token

            if (!id_pelicula) {
                return res.status(400).json({ error: "Falta id_pelicula" });
            }

            const id_favorito = await Favorito.agregar(id_usuario, id_pelicula);

            res.json({
                mensaje: "Película agregada a favoritos",
                id_favorito
            });

        } catch (error) {
            console.error("Error al agregar favorito:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    static async listar(req, res) {
        try {
            const id_usuario = req.usuario.id_usuario;

            const favoritos = await Favorito.listar(id_usuario);

            res.json(favoritos);

        } catch (error) {
            console.error("Error al listar favoritos:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    static async eliminar(req, res) {
        try {
            const { id_favorito } = req.params;
            const id_usuario = req.usuario.id_usuario;

            const borrados = await Favorito.eliminar(id_favorito, id_usuario);

            if (borrados === 0) {
                return res.status(404).json({ error: "Favorito no encontrado" });
            }

            res.json({ mensaje: "Favorito eliminado" });

        } catch (error) {
            console.error("Error al eliminar favorito:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

module.exports = FavoritosController;
