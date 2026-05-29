// -----------------------------
// CARTELERA – FRONTEND
// -----------------------------

const API_URL = "https://mascine-production.up.railway.app";

const contenedor = document.getElementById("lista-peliculas");
const buscador   = document.getElementById("input-busqueda");

let peliculas = [];

// 1. Cargar películas al iniciar
async function cargarPeliculas() {
  try {
    const res = await fetch(`${API_URL}/peliculas`);
    peliculas = await res.json();

    document.getElementById("mensaje-cargando").style.display = "none";

    if (!Array.isArray(peliculas) || peliculas.length === 0) {
      document.getElementById("mensaje-vacio").style.display = "block";
      return;
    }

    pintarPeliculas(peliculas);

  } catch (error) {
    console.error("Error cargando películas:", error);
    document.getElementById("mensaje-cargando").style.display = "none";
    document.getElementById("mensaje-vacio").style.display = "block";
    document.getElementById("mensaje-vacio").textContent = "No se pudo conectar al servidor.";
  }
}

// 2. Pintar tarjetas
function pintarPeliculas(lista) {
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    document.getElementById("mensaje-vacio").style.display = "block";
    return;
  }
  document.getElementById("mensaje-vacio").style.display = "none";

  lista.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("tarjeta-pelicula");

    const img = document.createElement("img");
    // BUG CORREGIDO: poster_url puede ser null → imagen de respaldo
    img.src = p.poster_url || "img/no-poster.png";
    img.alt = p.titulo;
    img.onerror = () => { img.src = "img/no-poster.png"; };

    div.innerHTML = `
      <h3>${p.titulo}</h3>
      <p class="genero-tag">${p.genero || "Sin género"}</p>
      <p class="sinopsis-corta">${(p.sinopsis || "").substring(0, 100)}${p.sinopsis && p.sinopsis.length > 100 ? "..." : ""}</p>
      <button onclick="verPelicula(${p.id_pelicula})">
        <i class="fa-solid fa-circle-info"></i> Ver ficha
      </button>
    `;
    // Insertar la imagen antes del texto
    div.insertBefore(img, div.firstChild);

    contenedor.appendChild(div);
  });
}

// 3. Navegar a la ficha  ← BUG CORREGIDO: p.id → p.id_pelicula
function verPelicula(id) {
  window.location.href = `pelicula.html?id=${id}`;
}

// 4. Buscador en tiempo real
buscador.addEventListener("input", () => {
  const texto = buscador.value.toLowerCase();
  const filtradas = peliculas.filter(p =>
    p.titulo.toLowerCase().includes(texto)
  );
  pintarPeliculas(filtradas);
});

cargarPeliculas();