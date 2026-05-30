// -----------------------------
// CALENDARIO DE ESTRENOS – FRONTEND
// -----------------------------

const API_URL = "https://mascine-production.up.railway.app/estrenos";

const calendarioDiv   = document.getElementById("calendario");
const listaEstrenosDiv = document.getElementById("lista-estrenos");

// ── BUG FIX: normaliza cualquier fecha a "YYYY-MM-DD" en hora local ──────
// new Date("2026-06-15") lo interpreta como UTC medianoche → en España (UTC+2)
// se convierte en el día 14. toLocaleDateString('en-CA') lo evita siempre.
function toFechaLocal(fechaRaw) {
    if (!fechaRaw) return "";
    // Si ya viene como "YYYY-MM-DD" sin hora, úsala directamente
    if (/^\d{4}-\d{2}-\d{2}$/.test(fechaRaw)) return fechaRaw;
    // Si viene con hora (ISO 8601), convierte respetando zona local
    const d = new Date(fechaRaw);
    return d.toLocaleDateString("en-CA"); // devuelve "YYYY-MM-DD"
}
// ─────────────────────────────────────────────────────────────────────────

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

    const hoy  = new Date();
    const año  = hoy.getFullYear();
    const mes  = hoy.getMonth();

    const primerDia = new Date(año, mes, 1).getDay();
    const diasMes   = new Date(año, mes + 1, 0).getDate();

    // Precomputar set de fechas con estreno para búsqueda O(1)
    const fechasConEstreno = new Set(
        estrenos.map(e => toFechaLocal(e.fecha_estr)).filter(Boolean)
    );

    let html = "<table class='calendario'>";
    html += "<tr><th>L</th><th>M</th><th>X</th><th>J</th><th>V</th><th>S</th><th>D</th></tr><tr>";

    let diaSemana = primerDia === 0 ? 6 : primerDia - 1;

    for (let i = 0; i < diaSemana; i++) {
        html += "<td></td>";
    }

    for (let dia = 1; dia <= diasMes; dia++) {

        const fechaStr = `${año}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

        // ── BUG FIX: compara contra fechas ya normalizadas ────────────────
        const tieneEstreno = fechasConEstreno.has(fechaStr);
        // ─────────────────────────────────────────────────────────────────

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

// -----------------------------
// 3. Activar clic en cada día
// -----------------------------
function activarClicks(estrenos) {
    const dias = document.querySelectorAll(".dia");

    dias.forEach(dia => {
        dia.addEventListener("click", () => {
            const fecha = dia.dataset.fecha;

            // ── BUG FIX: normaliza la fecha del estreno antes de comparar ─
            const estrenosDelDia = estrenos.filter(e => toFechaLocal(e.fecha_estr) === fecha);
            // ─────────────────────────────────────────────────────────────

            // Resaltar día seleccionado
            document.querySelectorAll(".dia.seleccionado").forEach(d => d.classList.remove("seleccionado"));
            dia.classList.add("seleccionado");

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
// 5. Inicializar
// -----------------------------
(async () => {
    const estrenos = await cargarEstrenos();
    generarCalendario(estrenos);
})();