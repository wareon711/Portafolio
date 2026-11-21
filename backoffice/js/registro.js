const API = "https://portfolio-api-three-black.vercel.app/api/v1";

const form = document.getElementById("formRegistro");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  mensaje.textContent = "Registrando usuario...";

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const itsonId = document.getElementById("itsonId").value.trim();
  const clave = document.getElementById("clave").value;

  try {
    const res = await fetch(API + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: nombre,
        email: correo,
        itsonId: itsonId,
        password: clave
      })
    });

    const datos = await res.json();

    if (!res.ok) {
      mensaje.textContent = datos.message || "No se pudo registrar el usuario";
      return;
    }

    alert("Usuario registrado correctamente");
    window.location.href = "login.html";
  } catch (error) {
    mensaje.textContent = "Error al conectar con el servidor";
  }
});
