// -----------------------------
// MAPA CON LEAFLET
// -----------------------------

// 1. Crear el mapa centrado inicialmente en Trebujena
const map = L.map('map').setView([36.870, -6.180], 12);

// 2. Cargar los tiles de OpenStreetMap (gratis)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// 3. Lista de cines (estáticos)
const cines = [
    {
        nombre: "Cinesur Bahía de Cádiz",
        lat: 36.529,
        lng: -6.292,
        url: "https://maps.google.com/?q=Cinesur+Bahia+de+Cádiz"
    },
    {
        nombre: "Yelmo Premium Puerta Europa",
        lat: 36.169,
        lng: -5.347,
        url: "https://maps.google.com/?q=Yelmo+Premium+Puerta+Europa"
    },
    {
        nombre: "Multicines El Centro",
        lat: 36.681,
        lng: -6.137,
        url: "https://maps.google.com/?q=Multicines+El+Centro"
    }
];

// 4. Crear marcadores y guardarlos para buscador/lista
let marcadores = [];

cines.forEach(cine => {
    const marker = L.marker([cine.lat, cine.lng]).addTo(map);

    marker.bindPopup(`
        <strong>${cine.nombre}</strong><br>
        <a href="${cine.url}" target="_blank">Ver en Google Maps</a>
    `);

    marcadores.push({ cine, marker });
});

// -----------------------------
// LISTA DE CINES
// -----------------------------
const listaCines = document.getElementById("lista-cines");

function pintarLista(filtro = "") {
    listaCines.innerHTML = "";

    const filtrados = cines.filter(c =>
        c.nombre.toLowerCase().includes(filtro.toLowerCase())
    );

    filtrados.forEach(cine => {
        const item = document.createElement("div");
        item.classList.add("cine-item");

        item.innerHTML = `
            <strong>${cine.nombre}</strong><br>
            <a href="${cine.url}" target="_blank">Ver en Google Maps</a>
        `;

        // Al hacer clic → centrar mapa
        item.addEventListener("click", () => {
            map.setView([cine.lat, cine.lng], 15);

            // Abrir popup del marcador
            const m = marcadores.find(m => m.cine.nombre === cine.nombre);
            m.marker.openPopup();
        });

        listaCines.appendChild(item);
    });
}

// Pintar lista inicial
pintarLista();

// -----------------------------
// BUSCADOR
// -----------------------------
document.getElementById("input-buscar").addEventListener("input", (e) => {
    const texto = e.target.value;
    pintarLista(texto);
});

// -----------------------------
// UBICACIÓN DEL USUARIO
// -----------------------------
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;

        L.marker([userLat, userLng], {
            icon: L.icon({
                iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
                iconSize: [32, 32]
            })
        }).addTo(map).bindPopup("Estás aquí");

        map.setView([userLat, userLng], 13);
    });
}
