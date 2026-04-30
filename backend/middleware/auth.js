// backend/middleware/auth.js
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta_super_segura";

function auth(req, res, next) {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ error: "Token no proporcionado" });
        }

        // Formato esperado: "Bearer token"
        const tokenLimpio = token.split(" ")[1];

        const decoded = jwt.verify(tokenLimpio, JWT_SECRET);

        // Guardamos los datos del usuario en req para usarlos en controladores
        req.usuario = decoded;

        next(); // continúa a la ruta protegida

    } catch (error) {
        console.error("Error en auth:", error);
        return res.status(401).json({ error: "Token inválido o expirado" });
    }
}

module.exports = auth;
