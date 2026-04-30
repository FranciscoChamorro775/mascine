//dotenv carga las variables del archivo env. (DB HOST, PORT, etc.)
require("dotenv").config();

console.log("DB_USER:", process.env.DB_USER); 
console.log("DB_PASS:", process.env.DB_PASS);

// Importamos Express, framework que simplifica crear servidores en Node.
const express = require("express");

// CORS permite que tu frontend (otra URL) pueda hacer peticiones a tu backend.
const cors = require("cors");

// Creamos la aplicación Express
const app = express();

/* -----------------------------
   MIDDLEWARES
----------------------------- */

// Habilitamos CORS para permitir las peticiones desde el frontend
app.use(cors());

// Permite que Express entienda JSON en el body de las peticiones
app.use(express.json());

/* ----------------------------- 
   RUTA DE PRUEBA 
----------------------------- */

app.get("/", (req, res) => { 
    res.send("Mascine API funcionando"); 
});

/* ----------------------------- 
   PROBAR CONEXIÓN A MYSQL 
----------------------------- */

// Importamos la conexión a la base de datos 
const db = require("./config/db"); 

// Probamos la conexión al arrancar el servidor 
db.getConnection() 
    .then(() => console.log("Conectado a MySQL correctamente")) 
    .catch(err => console.error("Error al conectar a MySQL:", err));

/* ----------------------------- 
   RUTAS DE LA API 
----------------------------- */

// Importamos las rutas de películas 
const peliculasRoutes = require("./routes/peliculasRoutes");

// Importamos las rutas de estrenos
const estrenosRoutes = require("./routes/estrenosRoutes");

// Importamos las rutas de usuarios
const usuariosRoutes = require("./routes/usuariosRoutes");

// Importamos las rutas de favoritos (SEMANA 10)
const favoritosRoutes = require("./routes/favoritosRoutes");

// Activamos las rutas
app.use("/peliculas", peliculasRoutes);
app.use("/estrenos", estrenosRoutes);
app.use("/usuarios", usuariosRoutes);    // ← Aquí usuarios
app.use("/favoritos", favoritosRoutes); // ← Aquí favoritos



/* ----------------------------- 
   ARRANCAR EL SERVIDOR 
----------------------------- */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`servidor mascine escuchando en puerto ${PORT}`);
});
