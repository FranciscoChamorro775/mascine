const express = require("express");
const router = express.Router();
const peliculasController = require("../controllers/peliculasController");

/**
 * Rutas de Estrenos
 * -----------------
 * Módulo para obtener las películas que tienen fecha_estr.
 */

// Obtener todos los estrenos
// GET /estrenos
router.get("/", peliculasController.getEstrenos);

module.exports = router;
