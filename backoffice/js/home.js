const API = "https://portfolio-api-three-black.vercel.app/api/v1";
const token = localStorage.getItem("authToken");

if (!token) {
  window.location.href = "login.html";
}

const lista = document.getElementById("listaProyectos");
const cajaForm = document.getElementById("cajaForm");
const formProyecto = document.getElementById("formProyecto");
const tituloForm = document.getElementById("tituloForm");
const btnAgregar = document.getElementById("btnAgregar");
const btnCancelar = document.getElementById("btnCancelar");
const btnSalir = document.getElementById("btnSalir");
const mensaje = document.getElementById("mensaje");

let proyectos = [];

btnSalir.addEventListener("click", function () {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userId");
  window.location.href = "login.html";
});

btnAgregar.addEventListener("click", function () {
  limpiarForm();
  tituloForm.textContent = "Nuevo Proyecto";
  cajaForm.classList.remove("oculto");
});

btnCancelar.addEventListener("click", function () {
  cajaForm.classList.add("oculto");
  limpiarForm();
});

function limpiarForm() {
  document.getElementById("proyectoId").value = "";
  document.getElementById("titulo").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("tecnologias").value = "";
  document.getElementById("repositorio").value = "";
  mensaje.textContent = "";
}

async function cargarProyectos() {
  lista.innerHTML = "<p class='subtitulo'>Cargando proyectos...</p>";

  try {
    const res = await fetch(API + "/projects", {
      headers: {
        "auth-token": token
      }
    });

    if (res.status === 401 || res.status === 403) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      window.location.href = "login.html";
      return;
    }

    if (!res.ok) {
      lista.innerHTML = "<p class='mensaje'>Error al cargar proyectos</p>";
      return;
    }

    proyectos = await res.json();
    mostrarProyectos();
  } catch (error) {
    lista.innerHTML = "<p class='mensaje'>Error de conexión con la API</p>";
  }
}

function mostrarProyectos() {
  lista.innerHTML = "";

  if (proyectos.length === 0) {
    lista.innerHTML = "<p class='subtitulo'>No hay proyectos registrados todavía.</p>";
    return;
  }

  for (let i = 0; i < proyectos.length; i++) {
    const p = proyectos[i];
    const card = document.createElement("article");
    card.className = "tarjeta";

    const tecs = Array.isArray(p.technologies) ? p.technologies.join(", ") : "";
    const repoLink = p.repository
      ? `<p class="repo-link"><a class="enlace" href="${p.repository}" target="_blank">Ver repositorio</a></p>`
      : "";

    card.innerHTML = `
      <h3>${p.title}</h3>
      <p class="desc-proyecto">${p.description}</p>
      <p class="tecs-proyecto">${tecs}</p>
      ${repoLink}
      <div class="acciones">
        <button class="btn-chico" onclick="editarProyecto('${p._id}')">Actualizar</button>
        <button class="btn-chico btn-gris" onclick="borrarProyecto('${p._id}')">Eliminar</button>
      </div>
    `;

    lista.appendChild(card);
  }
}

formProyecto.addEventListener("submit", async function (e) {
  e.preventDefault();
  mensaje.textContent = "Guardando...";

  const id = document.getElementById("proyectoId").value;
  const titulo = document.getElementById("titulo").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const tecsTexto = document.getElementById("tecnologias").value.trim();
  const repositorio = document.getElementById("repositorio").value.trim();
  const userId = localStorage.getItem("userId");

  const tecnologias = tecsTexto
    ? tecsTexto.split(",").map(function (t) { return t.trim(); })
    : [];

  const cuerpo = {
    title: titulo,
    description: descripcion,
    technologies: tecnologias,
    repository: repositorio,
    images: []
  };

  if (userId) {
    cuerpo.userId = userId;
  }

  try {
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
      body: JSON.stringify(cuerpo)
    });

    if (!res.ok) {
      const err = await res.json();
      mensaje.textContent = err.message || "Error al guardar el proyecto";
      return;
    }

    cajaForm.classList.add("oculto");
    limpiarForm();
    cargarProyectos();
  } catch (error) {
    mensaje.textContent = "Error al conectar con el servidor";
  }
});

function editarProyecto(id) {
  let proyecto = null;
  for (let i = 0; i < proyectos.length; i++) {
    if (proyectos[i]._id === id) {
      proyecto = proyectos[i];
      break;
    }
  }

  if (!proyecto) return;

  document.getElementById("proyectoId").value = proyecto._id;
  document.getElementById("titulo").value = proyecto.title || "";
  document.getElementById("descripcion").value = proyecto.description || "";
  document.getElementById("tecnologias").value = Array.isArray(proyecto.technologies)
    ? proyecto.technologies.join(", ")
    : "";
  document.getElementById("repositorio").value = proyecto.repository || "";

  tituloForm.textContent = "Actualizar Proyecto";
  cajaForm.classList.remove("oculto");
  window.scrollTo(0, 0);
}

async function borrarProyecto(id) {
  if (!confirm("¿Seguro que deseas eliminar este proyecto?")) return;

  try {
    const res = await fetch(API + "/projects/" + id, {
      method: "DELETE",
      headers: {
        "auth-token": token
      }
    });

    if (!res.ok) {
      alert("No se pudo eliminar el proyecto");
      return;
    }

    cargarProyectos();
  } catch (error) {
    alert("Error al conectar con el servidor");
  }
}

cargarProyectos();
