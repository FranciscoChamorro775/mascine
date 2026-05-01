// -----------------------------
// MAPA DE CINES – LEAFLET
// -----------------------------

// 1. Crear el mapa centrado inicialmente en Trebujena
const map = L.map('map').setView([36.870, -6.180], 12);

// 2. Cargar los tiles de OpenStreetMap (gratis y sin API key)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// -----------------------------
// 3. Lista de cines (datos estáticos)
// -----------------------------
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

// -----------------------------
// 4. Crear marcadores en el mapa
// -----------------------------
let marcadores = [];

cines.forEach(cine => {

    // Crear marcador
    const marker = L.marker([cine.lat, cine.lng]).addTo(map);

    // Popup con nombre + enlace a Google Maps
    marker.bindPopup(`
        <strong>${cine.nombre}</strong><br>
        <a href="${cine.url}" target="_blank">Ver en Google Maps</a>
    `);

    // Guardar para buscador y lista
    marcadores.push({ cine, marker });
});

// -----------------------------
// 5. LISTA LATERAL DE CINES
// -----------------------------
const listaCines = document.getElementById("lista-cines");

function pintarLista(filtro = "") {

    listaCines.innerHTML = "";

    // Filtrar por texto del buscador
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

        // Al hacer clic → centrar mapa y abrir popup
        item.addEventListener("click", () => {
            map.setView([cine.lat, cine.lng], 15);

            const m = marcadores.find(m => m.cine.nombre === cine.nombre);
            m.marker.openPopup();
        });

        listaCines.appendChild(item);
    });
}

// Pintar lista inicial
pintarLista();

// -----------------------------
// 6. BUSCADOR DE CINES
// -----------------------------
document.getElementById("input-buscar").addEventListener("input", (e) => {
    const texto = e.target.value;
    pintarLista(texto);
});

// -----------------------------
// 7. UBICACIÓN DEL USUARIO
// -----------------------------
if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(pos => {

        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;

        // Icono personalizado para el usuario
        L.marker([userLat, userLng], {
            icon: L.icon({
                iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
                iconSize: [32, 32]
            })
        })
        .addTo(map)
        .bindPopup("Estás aquí");

        // Centrar mapa en el usuario
        map.setView([userLat, userLng], 13);
    });
}
