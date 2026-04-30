-- ============================================================
--   BASE DE DATOS: Mascine
--   Autor: Francisco
--   Fecha: 2026
-- ============================================================

CREATE DATABASE IF NOT EXISTS mascine
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE mascine;

-- ============================================================
--   TABLA: usuarios
-- ============================================================

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Índices recomendados
CREATE INDEX idx_usuarios_email ON usuarios(email);

-- ============================================================
--   TABLA: peliculas
-- ============================================================

CREATE TABLE peliculas (
    id_pelicula INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    sinopsis TEXT,
    duracion INT,
    genero VARCHAR(100),
    anio INT,
    valoracion DECIMAL(2,1),
    poster_url VARCHAR(255),
    trailer_url VARCHAR(255),
    fecha_estreno DATE
);

-- Índices recomendados
CREATE INDEX idx_peliculas_titulo ON peliculas(titulo);
CREATE INDEX idx_peliculas_fecha ON peliculas(fecha_estreno);

-- ============================================================
--   TABLA: favoritos (relación N:N usuarios ↔ peliculas)
-- ============================================================

CREATE TABLE favoritos (
    id_favorito INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_pelicula INT NOT NULL,

    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE,
    FOREIGN KEY (id_pelicula) REFERENCES peliculas(id_pelicula)
        ON DELETE CASCADE
);

-- Índices recomendados
CREATE INDEX idx_fav_usuario ON favoritos(id_usuario);
CREATE INDEX idx_fav_pelicula ON favoritos(id_pelicula);

-- ============================================================
--   TABLA OPCIONAL: cines
--   (solo si quieres almacenar cines manualmente)
-- ============================================================

CREATE TABLE cines (
    id_cine INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    direccion VARCHAR(255),
    latitud DECIMAL(10,7),
    longitud DECIMAL(10,7)
);
