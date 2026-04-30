// 1. Obtener el ID de la película desde la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Variable global para guardar la película cargada
let pelicula = null;

// 2. Función que carga los datos de la película
async function cargarPelicula() {
  try {
    const res = await fetch(`http://localhost:3000/peliculas/${id}`);
    pelicula = await res.json();

    pintarPelicula(pelicula);

  } catch (error) {
    console.error("Error cargando la película:", error);
  }
}

// 3. Función que pinta la información en pantalla
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
    const videoId = p.trailer_url.split("v=")[1];
    document.getElementById("trailer").src = `https://www.youtube.com/embed/${videoId}`;
  } else {
    document.getElementById("trailer").style.display = "none";
  }

  // ❤️ Añadir a favoritos (versión con backend)
  document.getElementById("btn-favorito").addEventListener("click", agregarFavorito);
}

// -----------------------------
// FAVORITOS (BACKEND)
// -----------------------------
async function agregarFavorito() {

  const token = localStorage.getItem("token");

  // Si no está logueado → lo mandamos al login
  if (!token) {
    alert("Debes iniciar sesión para añadir favoritos.");
    window.location.href = "login.html";
    return;
  }

  try {
    const respuesta = await fetch("http://localhost:3000/favoritos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        id_pelicula: Number(id)
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

// 4. Ejecutar al cargar la página
cargarPelicula();

