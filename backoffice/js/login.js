const API = "https://portfolio-api-three-black.vercel.app/api/v1";

const form = document.getElementById("formLogin");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  mensaje.textContent = "Iniciando sesión...";

  const correo = document.getElementById("correo").value.trim();
  const clave = document.getElementById("clave").value;

  try {
    const res = await fetch(API + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: correo,
        password: clave
      })
    });

    const datos = await res.json();

    if (!res.ok) {
      mensaje.textContent = datos.message || "Correo o contraseña incorrectos";
      return;
    }

    localStorage.setItem("authToken", datos.token);
    if (datos.user && datos.user.id) {
      localStorage.setItem("userId", datos.user.id);
    }
    window.location.href = "index.html";
  } catch (error) {
    mensaje.textContent = "Error al conectar con el servidor";
  }
});
