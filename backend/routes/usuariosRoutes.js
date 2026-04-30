// backend/routes/usuariosRoutes.js
const express = require("express");
const router = express.Router();
const UsuariosController = require("../controllers/usuariosController");

router.post("/registro", UsuariosController.registro);
router.post("/login", UsuariosController.login);

module.exports = router;
