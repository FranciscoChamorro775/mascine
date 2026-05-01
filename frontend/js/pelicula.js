// -----------------------------
// OBTENER ID DE LA PELÍCULA DESDE LA URL
// -----------------------------

// Ejemplo de URL: pelicula.html?id=5
const params = new URLSearchParams(window.location.search);
const id = params.get("id"); // ← ID de la película

// Variable global donde guardaremos los datos de la película
let pelicula = null;

// URL base del backend desplegado en Railway
const API_URL = "https://mascine-production.up.railway.app";


// -----------------------------
// 1. Cargar datos de la película desde el backend
// -----------------------------
async function cargarPelicula() {
  try {
    // Petición GET al backend → /peliculas/:id
    const res = await fetch(`${API_URL}/peliculas/${id}`);
    pelicula = await res.json();

    // Pintar en pantalla
    pintarPelicula(pelicula);

  } catch (error) {
    console.error("Error cargando la película:", error);
  }
}


// -----------------------------
// 2. Pintar la información de la película en el HTML
// -----------------------------
function pintarPelicula(p) {

  // Título principal
  document.getElementById("titulo-pelicula").textContent = p.titulo;

  // Poster
  document.getElementById("poster").src = p.poster_url || "img/no-poster.png";
  document.getElementById("poster").alt = p.titulo;

  // Sinopsis
  document.getElementById("sinopsis").textContent = p.sinopsis;

  // Género
  document.getElementById("genero").textContent = p.genero || "N/D";

  // Tráiler (si existe)
  if (p.trailer_url) {
    // Convertir URL tipo watch?v= a formato embed
    const videoId = p.trailer_url.split("v=")[1];
    document.getElementById("trailer").src = `https://www.youtube.com/embed/${videoId}`;
  } else {
    // Si no hay tráiler → ocultar iframe
    document.getElementById("trailer").style.display = "none";
  }

  // Activar botón de favoritos
  document.getElementById("btn-favorito").addEventListener("click", agregarFavorito);
}


// -----------------------------
// 3. Añadir película a favoritos (requiere login)
// -----------------------------
async function agregarFavorito() {

  const token = localStorage.getItem("token");

  // Si no está logueado → redirigir al login
  if (!token) {
    alert("Debes iniciar sesión para añadir favoritos.");
    window.location.href = "login.html";
    return;
  }

  try {
    // Petición POST al backend → /favoritos
    const respuesta = await fetch(`${API_URL}/favoritos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token // ← Token JWT
      },
      body: JSON.stringify({
        id_pelicula: Number(id) // ID de la película actual
      })
    });

    const data = await respuesta.json();

    if (respuesta.ok) {
      alert("Película añadida a favoritos ❤️");
    } else {
      alert("Error: " + data.mensaje);
    }

  } catch (error) {
    console.error("Error al añadir favorito:", error);
    alert("No se pudo añadir a favoritos.");
  }
}


// -----------------------------
// 4. Ejecutar al cargar la página
// -----------------------------
cargarPelicula();

