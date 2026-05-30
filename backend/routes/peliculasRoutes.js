const express = require("express");
const router = express.Router();
const peliculasController = require("../controllers/peliculasController");
const auth = require("../middleware/auth"); // ← AÑADIDO

/**
 * Rutas de Películas
 * ------------------
 * GET  → público (cualquiera puede ver la cartelera)
 * POST / PUT / DELETE → protegidas (requieren token JWT)
 */

// ── Rutas PÚBLICAS ──────────────────────────────────────────
router.get("/",    peliculasController.getAllPeliculas);
router.get("/:id", peliculasController.getPeliculaById);

// ── Rutas PROTEGIDAS (requieren login) ──────────────────────
router.post("/",    auth, peliculasController.createPelicula);
router.put("/:id",  auth, peliculasController.updatePelicula);
router.delete("/:id", auth, peliculasController.deletePelicula);

module.exports = router;