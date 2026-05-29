// -----------------------------
// LOGIN – FRONTEND
// -----------------------------

const API_URL = "https://mascine-production.up.railway.app";

document.getElementById("form-login").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email    = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Por favor, rellena todos los campos.");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/usuarios/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      // El backend devuelve { error: "..." } en los errores
      alert(data.error || data.mensaje || "Credenciales incorrectas");
      return;
    }

    // Guardar token y usuario en localStorage
    localStorage.setItem("token",   data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));

    alert("✅ Inicio de sesión correcto");
    window.location.href = "index.html";

  } catch (error) {
    console.error("Error en login:", error);
    alert("No se pudo conectar con el servidor. Inténtalo de nuevo.");
  }
});