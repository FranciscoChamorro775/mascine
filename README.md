🎬 Mascine – Plataforma de Cartelera, Estrenos y Cines
Proyecto Final de Ciclo (DAW) – 2026

Mascine es una aplicación web completa que permite consultar películas en cartelera, ver detalles, gestionar favoritos, visualizar estrenos en un calendario interactivo y localizar cines cercanos mediante mapas.
Incluye backend en Node.js + Express + MySQL, frontend HTML/CSS/JS, autenticación con JWT y despliegue en Railway + Render.

🚀 Tecnologías utilizadas
Frontend
HTML5

CSS3

JavaScript

Leaflet.js (mapas sin API key)

Backend
Node.js

Express

MySQL2

JWT

Bcrypt

Despliegue
Backend → Railway

Frontend → Render

Base de datos → Railway MySQL

📁 Estructura del proyecto
Código
/MASCINE
│
├── backend
│   ├── app.js
│   ├── config/db.js
│   ├── controllers/
│   ├── middleware/auth.js
│   ├── models/
│   ├── routes/
│   ├── package.json
│
├── frontend
│   ├── index.html
│   ├── calendario.html
│   ├── cines.html
│   ├── favoritos.html
│   ├── login.html
│   ├── registro.html
│   ├── pelicula.html
│   ├── css/style.css
│   └── js/
│       ├── cartelera.js
│       ├── calendario.js
│       ├── cines.js
│       ├── favoritos.js
│       ├── login.js
│       ├── registro.js
│       └── pelicula.js
│
├── docs/
├── init.sql
├── url.txt
├── credenciales.txt
└── README.md
⚙️ Instalación y ejecución en local
1. Clonar el repositorio
Código
git clone https://github.com/tuusuario/mascine.git
cd mascine
2. Instalar dependencias del backend
Código
cd backend
npm install
3. Configurar la base de datos
Importar el archivo:

Código
init.sql
Configurar credenciales en:

Código
backend/config/db.js
4. Iniciar el backend
Código
npm start
Backend disponible en:

Código
http://localhost:3000
5. Abrir el frontend
Abrir:

Código
frontend/index.html
🔐 Autenticación
El sistema utiliza JWT.

Flujo:

Registro → /usuarios/registro

Login → /usuarios/login

El backend devuelve un token

El frontend lo guarda en localStorage

Rutas protegidas requieren:

Código
Authorization: Bearer <token>
⭐ Funcionalidades principales
Cartelera
Listado de películas

Buscador en tiempo real

Acceso al detalle

Ficha de película
Poster, sinopsis, género

Tráiler (YouTube)

Añadir a favoritos

Favoritos
Guardados por usuario

Requiere login

Gestión desde backend

Calendario de estrenos
Calendario dinámico

Días marcados con estrenos

Lista de estrenos del día

Cines cercanos
Mapa con Leaflet

Marcadores de cines

Popup con enlace a Google Maps

Buscador de cines

Ubicación del usuario

🌐 Despliegue
Backend (Railway)
Código
https://mascine-production.up.railway.app
Frontend (Render)
Código
https://TU-URL-DE-RENDER
👤 Autor
Francisco José Chamorro Tejero — DAW 2026  
Proyecto Final de Ciclo – Desarrollo de Aplicaciones Web