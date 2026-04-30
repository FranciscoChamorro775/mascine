// -----------------------------
// FAVORITOS – FRONTEND
// -----------------------------

const contenedor = document.getElementById("lista-favoritos");
const mensajeVacio = document.getElementById("mensaje-sin-favoritos");

// 1. Cargar favoritos al iniciar la página
document.addEventListener("DOMContentLoaded", cargarFavoritos);

async function cargarFavoritos() {

    const token = localStorage.getItem("token");

    // Si no hay token → no puede ver favoritos
    if (!token) {
        mensajeVacio.style.display = "block";
        mensajeVacio.textContent = "Debes iniciar sesión para ver tus favoritos.";
        return;
    }

    try {
        const res = await fetch("http://localhost:3000/favoritos", {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const favoritos = await res.json();

        // Si no hay favoritos
        if (!favoritos || favoritos.length === 0) {
            mensajeVacio.style.display = "block";
            return;
        }

        // Si hay favoritos → pintarlos
        pintarFavoritos(favoritos);

    } catch (error) {
        console.error("Error cargando favoritos:", error);
        mensajeVacio.style.display = "block";
        mensajeVacio.textContent = "Error cargando favoritos.";
    }
}

// 2. Pintar tarjetas de películas favoritas
function pintarFavoritos(lista) {

    lista.forEach(fav => {

        // Cada "fav" viene con: id_favorito, id_pelicula, titulo, poster_url
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-pelicula");

        tarjeta.innerHTML = `
            <img src="${fav.poster_url || 'img/no-poster.png'}" alt="${fav.titulo}">
            <h3>${fav.titulo}</h3>

            <button class="btn-eliminar" data-id="${fav.id_favorito}">
                ❌ Quitar
            </button>
        `;

        // Hacer clic en la tarjeta → ir al detalle
        tarjeta.addEventListener("click", (e) => {
            if (e.target.classList.contains("btn-eliminar")) return;
            window.location.href = `pelicula.html?id=${fav.id_pelicula}`;
        });

        // Botón eliminar favorito
        tarjeta.querySelector(".btn-eliminar").addEventListener("click", (e) => {
            e.stopPropagation(); // evitar que abra la ficha
            eliminarFavorito(fav.id_favorito);
        });

        contenedor.appendChild(tarjeta);
    });
}

// 3. Eliminar favorito
async function eliminarFavorito(idFavorito) {

    const token = localStorage.getItem("token");

    try {
        const res = await fetch(`http://localhost:3000/favoritos/${idFavorito}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const data = await res.json();

        if (res.ok) {
            alert("Película eliminada de favoritos");
            location.reload(); // recargar la lista
        } else {
            alert("Error: " + data.mensaje);
        }

    } catch (error) {
        console.error("Error eliminando favorito:", error);
        alert("No se pudo eliminar el favorito.");
    }
}
