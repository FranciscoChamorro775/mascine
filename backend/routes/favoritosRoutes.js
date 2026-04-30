// backend/routes/favoritosRoutes.js
const express = require("express");
const router = express.Router();
const FavoritosController = require("../controllers/favoritosController");
const auth = require("../middleware/auth");

// Todas las rutas requieren estar logueado
router.get("/", auth, FavoritosController.listar);
router.post("/", auth, FavoritosController.agregar);
router.delete("/:id_favorito", auth, FavoritosController.eliminar);

module.exports = router;
