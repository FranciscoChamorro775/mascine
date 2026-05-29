// -----------------------------
// FAVORITOS – FRONTEND
// -----------------------------

const API_URL   = "https://mascine-production.up.railway.app";
const contenedor    = document.getElementById("lista-favoritos");
const mensajeVacio  = document.getElementById("mensaje-sin-favoritos");

document.addEventListener("DOMContentLoaded", cargarFavoritos);

// 1. Cargar favoritos
async function cargarFavoritos() {
  const token = localStorage.getItem("token");

  if (!token) {
    mensajeVacio.style.display  = "block";
    mensajeVacio.textContent    = "Debes iniciar sesión para ver tus favoritos.";
    return;
  }

  try {
    const res = await fetch(`${API_URL}/favoritos`, {
      headers: { "Authorization": "Bearer " + token }
    });

    const favoritos = await res.json();

    if (!res.ok) {
      mensajeVacio.style.display  = "block";
      mensajeVacio.textContent    = favoritos.error || favoritos.mensaje || "Error cargando favoritos.";
      return;
    }

    if (!favoritos || favoritos.length === 0) {
      mensajeVacio.style.display  = "block";
      mensajeVacio.textContent    = "Todavía no tienes películas en favoritos.";
      return;
    }

    mensajeVacio.style.display = "none";
    pintarFavoritos(favoritos);

  } catch (error) {
    console.error("Error cargando favoritos:", error);
    mensajeVacio.style.display  = "block";
    mensajeVacio.textContent    = "No se pudo conectar con el servidor.";
  }
}

// 2. Pintar tarjetas
function pintarFavoritos(lista) {
  contenedor.innerHTML = "";

  lista.forEach(fav => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-pelicula");

    const img = document.createElement("img");
    img.src   = fav.poster_url || "img/no-poster.png";
    img.alt   = fav.titulo;
    img.onerror = () => { img.src = "img/no-poster.png"; };

    tarjeta.appendChild(img);
    tarjeta.innerHTML += `
      <h3>${fav.titulo}</h3>
      <p>${fav.genero || ""}</p>
      <button class="btn-eliminar" data-id="${fav.id_favorito}">
        ❌ Quitar
      </button>
    `;

    // Clic en tarjeta → detalle (excepto en el botón)
    tarjeta.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-eliminar")) return;
      window.location.href = `pelicula.html?id=${fav.id_pelicula}`;
    });

    // Botón eliminar
    tarjeta.querySelector(".btn-eliminar").addEventListener("click", (e) => {
      e.stopPropagation();
      eliminarFavorito(fav.id_favorito);
    });

    contenedor.appendChild(tarjeta);
  });
}

// 3. Eliminar favorito
async function eliminarFavorito(idFavorito) {
  const token = localStorage.getItem("token");

  try {
    const res  = await fetch(`${API_URL}/favoritos/${idFavorito}`, {
      method: "DELETE",
      headers: { "Authorization": "Bearer " + token }
    });

    const data = await res.json();

    if (res.ok) {
      alert("Película eliminada de favoritos");
      cargarFavoritos();
    } else {
      alert("Error: " + (data.error || data.mensaje || "No se pudo eliminar"));
    }

  } catch (error) {
    console.error("Error eliminando favorito:", error);
    alert("No se pudo eliminar el favorito.");
  }
}