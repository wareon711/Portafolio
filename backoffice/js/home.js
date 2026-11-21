const API = "https://portfolio-api-three-black.vercel.app/api/v1";
const token = localStorage.getItem("authToken");

if (!token) {
  window.location.href = "login.html";
}

async function validarToken() {
  try {
    const res = await fetch(API + "/projects", {
      headers: {
        "auth-token": token
      }
    });

    if (res.status === 401 || res.status === 403) {
      localStorage.removeItem("authToken");
      window.location.href = "login.html";
    }
  } catch (error) {
    window.location.href = "login.html";
  }
}

validarToken();

const btnAgregar = document.getElementById("btnAgregar");
const cajaForm = document.getElementById("cajaForm");

btnAgregar.addEventListener("click", function () {
  cajaForm.classList.toggle("oculto");
});
