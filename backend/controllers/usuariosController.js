// backend/controllers/usuariosController.js
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta_super_segura";

class UsuariosController {

    // Registro SIN bcrypt
    static async registro(req, res) {
        try {
            const { nombre, email, password } = req.body;

            if (!nombre || !email || !password) {
                return res.status(400).json({ error: "Faltan datos obligatorios" });
            }

            // ¿Existe ya el email?
            const usuarioExistente = await Usuario.buscarPorEmail(email);
            if (usuarioExistente) {
                return res.status(400).json({ error: "El email ya está registrado" });
            }

            // Guardar contraseña en texto plano
            const id = await Usuario.crear(nombre, email, password);

            res.json({ mensaje: "Usuario registrado correctamente", id_usuario: id });

        } catch (error) {
            console.error("Error en registro:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    // Login SIN bcrypt
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: "Faltan datos" });
            }

            const usuario = await Usuario.buscarPorEmail(email);
            if (!usuario) {
                return res.status(400).json({ error: "Credenciales incorrectas" });
            }

            // Comparación directa
            const coincide = password === usuario.password_hash;

            if (!coincide) {
                return res.status(400).json({ error: "Credenciales incorrectas" });
            }

            // Crear token
            const token = jwt.sign(
                { id_usuario: usuario.id_usuario, email: usuario.email },
                JWT_SECRET,
                { expiresIn: "7d" }
            );

            res.json({
                mensaje: "Login correcto",
                token,
                usuario: {
                    id_usuario: usuario.id_usuario,
                    nombre: usuario.nombre,
                    email: usuario.email
                }
            });

        } catch (error) {
            console.error("Error en login:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

module.exports = UsuariosController;
