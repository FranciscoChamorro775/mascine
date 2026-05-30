// -----------------------------
// FICHA DE PELÍCULA – FRONTEND
// -----------------------------

const params  = new URLSearchParams(window.location.search);
const id      = params.get("id");
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

        // ── BUG FIX: comprobar estado del favorito al cargar ──────────────
        await actualizarBotonFavorito();
        // ─────────────────────────────────────────────────────────────────

    } catch (error) {
        console.error("Error cargando la película:", error);
        document.getElementById("titulo-pelicula").textContent = "Error al cargar la película";
    }
}

// 2. Pintar información en el HTML
function pintarPelicula(p) {

    document.getElementById("titulo-pelicula").textContent = p.titulo || "Sin título";

    const poster = document.getElementById("poster");
    poster.src   = p.poster_url || "img/no-poster.png";
    poster.alt   = p.titulo;
    poster.onerror = () => { poster.src = "img/no-poster.png"; };

    document.getElementById("sinopsis").textContent = p.sinopsis || "Sin sinopsis disponible";
    document.getElementById("genero").textContent   = p.genero   || "No disponible";

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

    document.getElementById("btn-favorito").addEventListener("click", agregarFavorito);
}

// ── BUG FIX: consulta si ya es favorito y actualiza el botón ─────────────
async function actualizarBotonFavorito() {
    const token = localStorage.getItem("token");
    const btn   = document.getElementById("btn-favorito");

    if (!token) {
        // Sin sesión: botón visible pero redirige al login al pulsarlo
        btn.textContent = "🤍 Añadir a favoritos";
        btn.disabled = false;
        return;
    }

    try {
        const res = await fetch(`${API_URL}/favoritos`, {
            headers: { "Authorization": "Bearer " + token }
        });

        if (!res.ok) throw new Error("No se pudo obtener favoritos");

        const favoritos = await res.json();
        const esFavorito = favoritos.some(f => String(f.id_pelicula) === String(id));

        if (esFavorito) {
            btn.textContent = "❤️ Ya en favoritos";
            btn.disabled    = true;
            btn.title       = "Esta película ya está en tu lista de favoritos";
        } else {
            btn.textContent = "🤍 Añadir a favoritos";
            btn.disabled    = false;
        }

    } catch (error) {
        console.warn("No se pudo verificar favoritos:", error);
        // Si falla la verificación, dejamos el botón activo (no rompemos nada)
        btn.textContent = "🤍 Añadir a favoritos";
        btn.disabled    = false;
    }
}
// ─────────────────────────────────────────────────────────────────────────

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
            // ── BUG FIX: deshabilita el botón tras añadir ────────────────
            const btn = document.getElementById("btn-favorito");
            btn.textContent = "❤️ Ya en favoritos";
            btn.disabled    = true;
            // ─────────────────────────────────────────────────────────────
        } else if (respuesta.status === 409) {
            // El backend ya devuelve 409 si es duplicado
            alert("ℹ️ Esta película ya está en tus favoritos.");
            await actualizarBotonFavorito(); // sincroniza el botón por si acaso
        } else {
            alert("Error: " + (data.mensaje || data.error || "No se pudo añadir"));
        }

    } catch (error) {
        console.error("Error al añadir favorito:", error);
        alert("No se pudo añadir a favoritos. Comprueba tu conexión.");
    }
}

cargarPelicula();