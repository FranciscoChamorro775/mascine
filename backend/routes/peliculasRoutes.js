const express = require("express");
const router = express.Router();
const peliculasController = require("../controllers/peliculasController");

/**
 * Rutas de Películas
 * ------------------
 * Aquí definimos las rutas del CRUD de películas.
 */

// Obtener todas las películas
router.get("/", peliculasController.getAllPeliculas);

// Obtener una película por ID
router.get("/:id", peliculasController.getPeliculaById);

// Crear una película
router.post("/", peliculasController.createPelicula);

// Actualizar una película
router.put("/:id", peliculasController.updatePelicula);

// Eliminar una película
router.delete("/:id", peliculasController.deletePelicula);

module.exports = router;
