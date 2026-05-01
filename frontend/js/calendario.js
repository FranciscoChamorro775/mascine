// -----------------------------
// CALENDARIO DE ESTRENOS – FRONTEND
// -----------------------------

// URL del backend en Railway
const API_URL = "https://mascine-production.up.railway.app/estrenos";

// Elementos del DOM
const calendarioDiv = document.getElementById("calendario");
const listaEstrenosDiv = document.getElementById("lista-estrenos");

// -----------------------------
// 1. Obtener estrenos del backend
// -----------------------------
async function cargarEstrenos() {
    try {
        const res = await fetch(API_URL);
        const datos = await res.json();
        return datos;
    } catch (error) {
        console.error("Error cargando estrenos:", error);
        return [];
    }
}

// -----------------------------
// 2. Generar calendario del mes actual
// -----------------------------
function generarCalendario(estrenos) {

    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = hoy.getMonth();

    // Primer día del mes (0 = domingo)
    const primerDia = new Date(año, mes, 1).getDay();

    // Total de días del mes
    const diasMes = new Date(año, mes + 1, 0).getDate();

    let html = "<table class='calendario'>";
    html += "<tr><th>L</th><th>M</th><th>X</th><th>J</th><th>V</th><th>S</th><th>D</th></tr><tr>";

    // Ajustar inicio (si primer día no es lunes)
    let diaSemana = primerDia === 0 ? 6 : primerDia - 1;

    for (let i = 0; i < diaSemana; i++) {
        html += "<td></td>";
    }

    // Pintar días del mes
    for (let dia = 1; dia <= diasMes; dia++) {

        const fechaStr = `${año}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

        // Comprobar si hay estrenos ese día
        const tieneEstreno = estrenos.some(e => e.fecha_estr?.startsWith(fechaStr));

        html += `
            <td class="dia ${tieneEstreno ? "estreno" : ""}" data-fecha="${fechaStr}">
                ${dia}
            </td>
        `;

        // Saltar a la siguiente fila cada 7 días
        if ((dia + diaSemana) % 7 === 0) {
            html += "</tr><tr>";
        }
    }

    html += "</tr></table>";
    calendarioDiv.innerHTML = html;

    activarClicks(estrenos);
}

// -----------------------------
// 3. Activar clic en cada día
// -----------------------------
function activarClicks(estrenos) {
    const dias = document.querySelectorAll(".dia");

    dias.forEach(dia => {
        dia.addEventListener("click", () => {

            const fecha = dia.dataset.fecha;

            // Filtrar estrenos de ese día
            const estrenosDelDia = estrenos.filter(e =>
                e.fecha_estr?.startsWith(fecha)
            );

            mostrarEstrenos(estrenosDelDia, fecha);
        });
    });
}

// -----------------------------
// 4. Mostrar estrenos del día
// -----------------------------
function mostrarEstrenos(lista, fecha) {

    listaEstrenosDiv.innerHTML = `<h3>Estrenos del ${fecha}</h3>`;

    if (lista.length === 0) {
        listaEstrenosDiv.innerHTML += "<p>No hay estrenos este día.</p>";
        return;
    }

    lista.forEach(p => {
        listaEstrenosDiv.innerHTML += `
            <div class="estreno-item">
                <h4>${p.titulo}</h4>
                <p>${p.sinopsis || "Sin sinopsis disponible."}</p>
            </div>
        `;
    });
}

// -----------------------------
// 5. Inicializar calendario
// -----------------------------
(async () => {
    const estrenos = await cargarEstrenos();
    generarCalendario(estrenos);
})();
