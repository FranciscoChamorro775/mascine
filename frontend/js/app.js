// ------------------------------------------------------
// 1. Función principal que carga las películas del backend
// ------------------------------------------------------
async function cargarPeliculas() {
  try {
    // Petición GET al backend
    const res = await fetch('http://localhost:3000/peliculas');

    // Convertimos la respuesta a JSON
    const peliculas = await res.json();

    // Ocultar mensaje de "cargando"
    document.getElementById('mensaje-cargando').style.display = 'none';

    // Pintar películas en pantalla
    pintarPeliculas(peliculas);

  } catch (error) {
    console.error("Error cargando películas:", error);
  }
}


// ------------------------------------------------------
// 2. Función que recibe una lista de películas y las muestra
// ------------------------------------------------------
function pintarPeliculas(lista) {

  const contenedor = document.getElementById('lista-peliculas');
  const mensajeVacio = document.getElementById('mensaje-vacio');

  // Limpiar contenido previo
  contenedor.innerHTML = '';

  // Si no hay películas → mostrar mensaje
  if (lista.length === 0) {
    mensajeVacio.style.display = 'block';
    return;
  }

  // Si hay películas → ocultar mensaje
  mensajeVacio.style.display = 'none';

  // Recorrer cada película
  lista.forEach(p => {

    contenedor.innerHTML += `
      <div class="tarjeta-pelicula" onclick="location.href='pelicula.html?id=${p.id_pelicula}'">
        <img src="${p.poster_url || 'img/no-poster.png'}" alt="${p.titulo}">
        <h3>${p.titulo}</h3>
        <p>${p.sinopsis}</p>
      </div>
    `;
  });
}


// ------------------------------------------------------
// 3. Ejecutar cargarPeliculas cuando el DOM esté listo
// ------------------------------------------------------
document.addEventListener('DOMContentLoaded', cargarPeliculas);



