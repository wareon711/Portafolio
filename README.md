<div align="center">

# 🚀 Portafolio & Backoffice — Proyecto Final

**Desarrollado por Gibran Alonso Ibarra Palomares**  
*Estudiante de Ingeniería en Software · 5to Semestre*

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-dc2626?style=for-the-badge&logo=github&logoColor=white)](https://wareon711.github.io/Portafolio/)

<br>

🌐 **[Ver Portafolio en Vivo](https://wareon711.github.io/Portafolio/)** · 🔐 **[Abrir Backoffice](https://wareon711.github.io/Portafolio/backoffice/login.html)**

</div>

---

## 📌 Descripción General

Este repositorio reúne el desarrollo completo de un sistema **Backoffice administrativo** y un **Portafolio web público**, conectados a una API REST con autenticación mediante JWT (`localStorage`) y operaciones CRUD de proyectos.

---

## 🧩 Evolución por Avances

| Avance | Rama | Descripción | Enlace |
| :---: | :---: | :--- | :---: |
| **1er Avance** | `Avance-1` | Maquetación estática en HTML5 y CSS3 (`Login`, `Register`, `Home` inaccesible), diseño responsivo y estilo deportivo oscuro. | [Ver rama](https://github.com/wareon711/Portafolio/tree/Avance-1) |
| **2do Avance** | `Avance-2` | Integración JS para `POST /auth/register`, `POST /auth/login` con `localStorage`, protección de ruta en Home y elementos visuales del CRUD. | [Ver rama](https://github.com/wareon711/Portafolio/tree/Avance-2) |
| **3er Avance** | `Avance-3` | CRUD completo (`GET`, `POST`, `PUT`, `DELETE` en `/projects` con header `auth-token`), cierre de sesión y despliegue en GitHub Pages. | [Ver rama](https://github.com/wareon711/Portafolio/tree/Avance-3) |
| **4to Avance** | `Avance-4` | Portafolio público independiente en `portafolio/` consumiendo `GET /publicProjects/:itsonId` con animaciones (`AOS` y `Boxicons`). | [Ver rama](https://github.com/wareon711/Portafolio/tree/Avance-4) |

---

## 📂 Estructura del Proyecto

```text
Portafolio/
├── index.html                  # Redirección automática al portafolio público
├── 404.html                    # Página de error 404 personalizada (GitHub Pages)
├── 500.html                    # Página de error 500 personalizada
├── style.css                   # Estilos para las páginas de error
├── README.md                   # Documentación general del repositorio
│
├── backoffice/                 # Panel administrativo protegido
│   ├── index.html              # Home / CRUD de proyectos (requiere token)
│   ├── login.html              # Inicio de sesión
│   ├── register.html           # Registro de usuarios
│   ├── css/
│   │   └── style.css           # Estilos del Backoffice
│   └── js/
│       ├── login.js            # Lógica de autenticación
│       ├── registro.js         # Registro de nuevos usuarios
│       └── home.js             # Validación de sesión y CRUD de proyectos
│
└── portafolio/                 # Portafolio web público
    ├── index.html              # Vista principal (Inicio, Sobre mí, Habilidades, Proyectos, Contacto)
    ├── css/
    │   └── style.css           # Diseño oscuro responsivo
    └── js/
        └── app.js              # Consumo de proyectos públicos y animaciones AOS
```

---

## 🛠️ Tecnologías y Habilidades

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Java](https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![SQL Server](https://img.shields.io/badge/SQL%20Server-CC2927?style=flat-square&logo=microsoftsqlserver&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)

</div>

---

## 🔌 API Utilizada

Conectado a **Portfolio API** (`https://portfolio-api-three-black.vercel.app/api/v1`):

- `POST /auth/register` — Registro de usuarios
- `POST /auth/login` — Inicio de sesión y obtención de JWT
- `GET /projects` · `GET /projects/:projectId` · `POST /projects` · `PUT /projects/:projectId` · `DELETE /projects/:projectId` — CRUD protegido (`auth-token`)
- `GET /publicProjects/:itsonId` — Consulta pública de proyectos para el portafolio
