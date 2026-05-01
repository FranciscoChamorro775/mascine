// -----------------------------
// REGISTRO – FRONTEND
// -----------------------------

const API_URL = "https://mascine-production.up.railway.app/usuarios/registro";

document.getElementById("form-registro").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.mensaje || "Error al registrarse");
            return;
        }

        alert("Registro completado. Ahora puedes iniciar sesión.");
        window.location.href = "login.html";

    } catch (error) {
        console.error("Error en registro:", error);
        alert("No se pudo completar el registro");
    }
});
