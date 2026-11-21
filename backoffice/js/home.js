const API = "https://portfolio-api-three-black.vercel.app/api/v1";
const token = localStorage.getItem("authToken");

if (!token) {
  window.location.href = "login.html";
}

const lista = document.getElementById("listaProyectos");
const cajaForm = document.getElementById("cajaForm");
const form = document.getElementById("formProyecto");

document.getElementById("btnSalir").onclick = function () {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userId");
  window.location.href = "login.html";
};

document.getElementById("btnAgregar").onclick = function () {
  document.getElementById("proyectoId").value = "";
  form.reset();
  document.getElementById("tituloForm").textContent = "Agregar Proyecto";
  cajaForm.classList.remove("oculto");
};

document.getElementById("btnCancelar").onclick = function () {
  cajaForm.classList.add("oculto");
  form.reset();
};

async function cargar() {
  const res = await fetch(API + "/projects", {
    headers: { "auth-token": token }
  });

  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem("authToken");
    window.location.href = "login.html";
    return;
  }

  const proyectos = await res.json();
  let html = "";

  for (let i = 0; i < proyectos.length; i++) {
    const p = proyectos[i];
    html += `
      <article class="tarjeta">
        <h3>${p.title}</h3>
        <p class="desc-proyecto">${p.description}</p>
        <p class="tecs-proyecto">${p.technologies || ""}</p>
        <div class="acciones">
          <button class="btn-chico" onclick="editar('${p._id}')">Actualizar</button>
          <button class="btn-chico btn-gris" onclick="borrar('${p._id}')">Eliminar</button>
        </div>
      </article>
    `;
  }

  lista.innerHTML = html || "<p class='subtitulo'>No hay proyectos.</p>";
}

form.onsubmit = async function (e) {
  e.preventDefault();

  const id = document.getElementById("proyectoId").value;
  const tecs = document.getElementById("tecnologias").value;

  const datos = {
    title: document.getElementById("titulo").value,
    description: document.getElementById("descripcion").value,
    technologies: tecs ? tecs.split(",") : [],
    repository: document.getElementById("repositorio").value,
    userId: localStorage.getItem("userId"),
    images: []
  };

  let url = API + "/projects";
  let metodo = "POST";

  if (id !== "") {
    url = API + "/projects/" + id;
    metodo = "PUT";
  }

  const res = await fetch(url, {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
      "auth-token": token
    },
    body: JSON.stringify(datos)
  });

  if (res.ok) {
    cajaForm.classList.add("oculto");
    form.reset();
    cargar();
  } else {
    alert("Error al guardar");
  }
};

async function editar(id) {
  const res = await fetch(API + "/projects/" + id, {
    headers: { "auth-token": token }
  });

  if (!res.ok) return;

  const p = await res.json();
  document.getElementById("proyectoId").value = p._id;
  document.getElementById("titulo").value = p.title || "";
  document.getElementById("descripcion").value = p.description || "";
  document.getElementById("tecnologias").value = p.technologies || "";
  document.getElementById("repositorio").value = p.repository || "";

  document.getElementById("tituloForm").textContent = "Actualizar Proyecto";
  cajaForm.classList.remove("oculto");
}

async function borrar(id) {
  if (!confirm("¿Eliminar proyecto?")) return;

  const res = await fetch(API + "/projects/" + id, {
    method: "DELETE",
    headers: { "auth-token": token }
  });

  if (res.ok) {
    cargar();
  }
}

cargar();
