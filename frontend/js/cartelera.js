// -----------------------------
// CARTELERA – FRONTEND
// -----------------------------

// URL del backend en Railway
const API_URL = "https://mascine-production.up.railway.app";

// Elementos del DOM
const contenedor = document.getElementById("lista-peliculas");
const buscador = document.getElementById("input-busqueda"); // ← CORREGIDO

// Lista completa de películas (para el buscador)
let peliculas = [];

// -----------------------------
// 1. Cargar películas al iniciar
// -----------------------------
async function cargarPeliculas() {
  try {
    const res = await fetch(`${API_URL}/peliculas`);
    peliculas = await res.json();

    if (peliculas.length === 0) {
      document.getElementById("mensaje-vacio").style.display = "block";
      return;
    }

    document.getElementById("mensaje-cargando").style.display = "none";
    pintarPeliculas(peliculas);

  } catch (error) {
    console.error("Error cargando películas:", error);
  }
}

// -----------------------------
// 2. Pintar películas en pantalla
// -----------------------------
function pintarPeliculas(lista) {
  contenedor.innerHTML = "";

  lista.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("tarjeta-pelicula"); // ← CORREGIDO para coincidir con tu CSS

    div.innerHTML = `
      <img src="${p.poster_url || 'img/no-poster.png'}" alt="${p.titulo}">
      <h3>${p.titulo}</h3>
      <button onclick="verPelicula(${p.id})">Ver ficha</button>
    `;

    contenedor.appendChild(div);
  });
}

// -----------------------------
// 3. Ir a la ficha de película
// -----------------------------
function verPelicula(id) {
  window.location.href = `pelicula.html?id=${id}`;
}

// -----------------------------
// 4. Buscador en tiempo real
// -----------------------------
buscador.addEventListener("input", () => {
  const texto = buscador.value.toLowerCase();

  const filtradas = peliculas.filter(p =>
    p.titulo.toLowerCase().includes(texto)
  );

  pintarPeliculas(filtradas);
});

// -----------------------------
// Ejecutar al cargar
// -----------------------------
cargarPeliculas();
