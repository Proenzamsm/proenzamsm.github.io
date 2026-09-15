import { menu } from "./../dados/menu.js";

const pageContent = document.getElementById("page-content");
const mainMenu = document.getElementById("main-menu");

const pages = {
  index: { label: "Início", data: "../dados/index.js", renderer: "./index.js" },
  projeto: { label: "Projeto", data: "../dados/projeto.js", renderer: "./projeto.js" },
  objetivos: { label: "Objetivos", data: "../dados/objetivos.js", renderer: "./objetivos.js" },
  atividades: { label: "Atividades", data: "../dados/atividades.js", renderer: "./atividades.js" },
  resultados: { label: "Resultados", data: "../dados/resultados.js", renderer: "./resultados.js" },
  contactos: { label: "Contactos", data: "../dados/contactos.js", renderer: "./contactos.js" }
};

function renderMenu() {
  mainMenu.innerHTML = "";
  const items = Array.isArray(menu) ? menu : [
    { id: "index", label: "Início" },
    { id: "projeto", label: "Projeto" },
    { id: "objetivos", label: "Objetivos" },
    { id: "atividades", label: "Atividades" },
    { id: "resultados", label: "Resultados" },
    { id: "contactos", label: "Contactos" }
  ];

  for (const item of items) {
    const id = item.id || item.page || item.href?.replace(/^#/, "");
    if (!pages[id]) continue;
    const link = document.createElement("a");
    link.href = `#${id}`;
    link.textContent = item.label || item.nome || id;
    link.dataset.page = id;
    mainMenu.appendChild(link);
  }
}

async function loadPage(id, pushFocus = true) {
  const page = pages[id] || pages.index;
  const targetId = pages[id] ? id : "index";

  document.querySelectorAll("#main-menu a").forEach(a => {
    a.classList.toggle("active", a.dataset.page === targetId);
    a.setAttribute("aria-current", a.dataset.page === targetId ? "page" : "false");
  });

  pageContent.classList.add("is-changing");
  await new Promise(resolve => setTimeout(resolve, 180));

  try {
    const dataModule = await import(page.data);
    const rendererModule = await import(page.renderer);
    pageContent.innerHTML = "";
    const render = rendererModule.render || rendererModule.default;
    if (typeof render === "function") {
      render(pageContent, dataModule.default || dataModule);
    } else {
      pageContent.textContent = "Não foi possível carregar esta página.";
    }
  } catch (error) {
    console.error(error);
    pageContent.innerHTML = "<p>Ocorreu um erro ao carregar o conteúdo.</p>";
  }

  pageContent.classList.remove("is-changing");
  if (pushFocus) pageContent.focus({ preventScroll: true });
}

function route() {
  const id = (location.hash || "#index").slice(1).split("?")[0];
  loadPage(id);
}

renderMenu();
window.addEventListener("hashchange", route);
route();
