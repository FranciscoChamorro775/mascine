// -----------------------------
// LOGIN – FRONTEND
// -----------------------------

const API_URL = "https://mascine-production.up.railway.app/usuarios/login";

document.getElementById("form-login").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.mensaje || "Credenciales incorrectas");
            return;
        }

        // Guardar token y usuario
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));

        alert("Inicio de sesión correcto");
        window.location.href = "index.html";

    } catch (error) {
        console.error("Error en login:", error);
        alert("No se pudo iniciar sesión");
    }
});
