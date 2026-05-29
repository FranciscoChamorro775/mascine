// -----------------------------
// FICHA DE PELÍCULA – FRONTEND
// -----------------------------

const params = new URLSearchParams(window.location.search);
const id     = params.get("id");
const API_URL = "https://mascine-production.up.railway.app";

let pelicula = null;

// 1. Cargar datos desde el backend
async function cargarPelicula() {
  if (!id) {
    document.getElementById("titulo-pelicula").textContent = "Película no encontrada";
    return;
  }

  try {
    const res = await fetch(`${API_URL}/peliculas/${id}`);

    if (!res.ok) {
      document.getElementById("titulo-pelicula").textContent = "Película no encontrada";
      return;
    }

    pelicula = await res.json();
    pintarPelicula(pelicula);

  } catch (error) {
    console.error("Error cargando la película:", error);
    document.getElementById("titulo-pelicula").textContent = "Error al cargar la película";
  }
}

// 2. Pintar información en el HTML
function pintarPelicula(p) {

  document.getElementById("titulo-pelicula").textContent = p.titulo || "Sin título";

  // Poster con fallback
  const poster = document.getElementById("poster");
  poster.src = p.poster_url || "img/no-poster.png";
  poster.alt = p.titulo;
  poster.onerror = () => { poster.src = "img/no-poster.png"; };

  // Sinopsis y género  ← BUG CORREGIDO: antes no se mostraban
  document.getElementById("sinopsis").textContent = p.sinopsis || "Sin sinopsis disponible";
  document.getElementById("genero").textContent   = p.genero   || "No disponible";

  // Tráiler
  const trailer = document.getElementById("trailer");
  if (p.trailer_url && p.trailer_url.includes("v=")) {
    const videoId = p.trailer_url.split("v=")[1].split("&")[0];
    trailer.src = `https://www.youtube.com/embed/${videoId}`;
  } else if (p.trailer_url && p.trailer_url.includes("youtu.be/")) {
    const videoId = p.trailer_url.split("youtu.be/")[1].split("?")[0];
    trailer.src = `https://www.youtube.com/embed/${videoId}`;
  } else {
    trailer.parentElement.style.display = "none";
  }

  // Botón favorito
  document.getElementById("btn-favorito").addEventListener("click", agregarFavorito);
}

// 3. Añadir a favoritos
async function agregarFavorito() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Debes iniciar sesión para añadir favoritos.");
    window.location.href = "login.html";
    return;
  }

  try {
    const respuesta = await fetch(`${API_URL}/favoritos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ id_pelicula: Number(id) })
    });

    const data = await respuesta.json();

    if (respuesta.ok) {
      alert("✅ Película añadida a favoritos");
    } else {
      alert("Error: " + (data.mensaje || data.error || "No se pudo añadir"));
    }

  } catch (error) {
    console.error("Error al añadir favorito:", error);
    alert("No se pudo añadir a favoritos. Comprueba tu conexión.");
  }
}

cargarPelicula();