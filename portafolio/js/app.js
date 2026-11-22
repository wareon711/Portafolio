const API = "https://portfolio-api-three-black.vercel.app/api/v1";
const ITSON_ID = "267883";

AOS.init({
  duration: 700,
  once: true
});

const menu = document.getElementById("menu");

document.getElementById("btnMenu").onclick = function () {
  menu.classList.toggle("activo");
};

const enlaces = menu.querySelectorAll("a");
for (let i = 0; i < enlaces.length; i++) {
  enlaces[i].onclick = function () {
    menu.classList.remove("activo");
  };
}

async function cargarProyectos() {
  const lista = document.getElementById("listaProyectos");
  const estado = document.getElementById("estado");

  try {
    const res = await fetch(API + "/publicProjects/" + ITSON_ID);

    if (!res.ok) {
      estado.textContent = "Error al cargar proyectos";
      return;
    }

    const proyectos = await res.json();

    if (proyectos.length === 0) {
      estado.textContent = "No hay proyectos registrados.";
      return;
    }

    estado.style.display = "none";
    let html = "";

    for (let i = 0; i < proyectos.length; i++) {
      const p = proyectos[i];
      const img = p.images && p.images[0] ? `<img src="${p.images[0]}" alt="${p.title}">` : "";

      let tecs = "";
      if (p.technologies) {
        for (let j = 0; j < p.technologies.length; j++) {
          tecs += `<span class="tec">${p.technologies[j].trim()}</span>`;
        }
      }

      const repo = p.repository
        ? `<a class="enlace" href="${p.repository}" target="_blank"><i class="bx bxl-github"></i> Ver repositorio</a>`
        : "";

      html += `
        <article class="proyecto" data-aos="fade-up">
          ${img}
          <div class="proyecto-info">
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <div class="tecs">${tecs}</div>
            ${repo}
          </div>
        </article>
      `;
    }

    lista.innerHTML = html;
    AOS.refresh();
  } catch (error) {
    estado.textContent = "Error de conexión";
  }
}

cargarProyectos();
