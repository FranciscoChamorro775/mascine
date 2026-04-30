// URL del backend
const API_URL = "http://localhost:3000/estrenos";

// Elementos del DOM
const calendarioDiv = document.getElementById("calendario");
const listaEstrenosDiv = document.getElementById("lista-estrenos");

// Obtener estrenos del backend
async function cargarEstrenos() {
    const res = await fetch(API_URL);
    const datos = await res.json();
    return datos;
}

// Generar calendario del mes actual
function generarCalendario(estrenos) {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = hoy.getMonth();

    const primerDia = new Date(año, mes, 1).getDay();
    const diasMes = new Date(año, mes + 1, 0).getDate();

    let html = "<table class='calendario'>";
    html += "<tr><th>L</th><th>M</th><th>X</th><th>J</th><th>V</th><th>S</th><th>D</th></tr><tr>";

    // Ajustar inicio (si primer día no es lunes)
    let diaSemana = primerDia === 0 ? 6 : primerDia - 1;
    for (let i = 0; i < diaSemana; i++) {
        html += "<td></td>";
    }

    // Pintar días
    for (let dia = 1; dia <= diasMes; dia++) {
        const fechaStr = `${año}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

        const tieneEstreno = estrenos.some(e => e.fecha_estr?.startsWith(fechaStr));

        html += `
            <td class="dia ${tieneEstreno ? "estreno" : ""}" data-fecha="${fechaStr}">
                ${dia}
            </td>
        `;

        if ((dia + diaSemana) % 7 === 0) {
            html += "</tr><tr>";
        }
    }

    html += "</tr></table>";
    calendarioDiv.innerHTML = html;

    activarClicks(estrenos);
}

// Activar clic en cada día
function activarClicks(estrenos) {
    const dias = document.querySelectorAll(".dia");

    dias.forEach(dia => {
        dia.addEventListener("click", () => {
            const fecha = dia.dataset.fecha;

            const estrenosDelDia = estrenos.filter(e =>
                e.fecha_estr?.startsWith(fecha)
            );

            mostrarEstrenos(estrenosDelDia, fecha);
        });
    });
}

// Mostrar estrenos del día
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
                <p>${p.sinopsis || "Sin sinopsis"}</p>
            </div>
        `;
    });
}

// Inicializar
(async () => {
    const estrenos = await cargarEstrenos();
    generarCalendario(estrenos);
})();
