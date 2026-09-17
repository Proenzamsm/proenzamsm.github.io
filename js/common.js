const mainNav = document.getElementById("main-nav");
const menuToggle = document.querySelector(".menu-toggle");
const pageContent = document.getElementById("page-content");

const PAGE_FILES = {
  "index.html": "index",
  "projeto.html": "projeto",
  "objetivos.html": "objetivos",
  "atividades.html": "atividades",
  "mobilidades.html": "mobilidades",
  "disseminacao.html": "disseminacao",
  "resultados.html": "resultados",
  "candidaturas.html": "candidaturas",
  "contactos.html": "contactos"
};

function currentFile() {
  return window.location.pathname.split("/").pop() || "index.html";
}

function renderMenu() {
  if (!mainNav || !window.MENU) return;

  const current = currentFile();

  mainNav.innerHTML = window.MENU.map(item => {
    if (item.submenu) {
      const submenuActive = item.submenu.some(sub => sub.href === current);
      return `
        <div class="has-submenu">
          <div class="submenu-main">
            <span class="submenu-label ${submenuActive ? "active" : ""}">${item.label}</span>
            <button class="submenu-toggle" type="button" aria-expanded="false" aria-label="Abrir submenu ${item.label}">
              <span class="submenu-arrow">▾</span>
            </button>
          </div>
          <div class="submenu">
            ${item.submenu.map(sub => `
              <a href="${sub.href}" class="${sub.href === current ? "active" : ""}">${sub.label}</a>
            `).join("")}
          </div>
        </div>
      `;
    }

    return `<a href="${item.href}" class="${item.href === current ? "active" : ""}">${item.label}</a>`;
  }).join("");
}

function closeMenus() {
  mainNav?.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
  document.querySelectorAll(".has-submenu").forEach(item => {
    item.classList.remove("submenu-open");
    item.querySelector(".submenu-toggle")?.setAttribute("aria-expanded", "false");
  });
}

function runPageScript(page) {
  const base = PAGE_FILES[page];
  if (!base) return Promise.reject(new Error("Página não encontrada: " + page));

  return Promise.all([
    fetch(`dados/${base}.js`).then(r => {
      if (!r.ok) throw new Error(`Não foi possível carregar dados/${base}.js`);
      return r.text();
    }),
    fetch(`js/${base}.js`).then(r => {
      if (!r.ok) throw new Error(`Não foi possível carregar js/${base}.js`);
      return r.text();
    })
  ]).then(([dataCode, pageCode]) => {
    window.PAGE_DATA = undefined;
    new Function(dataCode)();
    new Function(pageCode)();
    document.body.dataset.page = base;
    renderMenu();
    closeMenus();
  });
}

async function navigateTo(href, addHistory = true) {
  const url = new URL(href, window.location.href);
  if (url.origin !== window.location.origin) return;

  const file = url.pathname.split("/").pop() || "index.html";
  if (!PAGE_FILES[file]) return;

  if (file === currentFile() && !addHistory) return;

  closeMenus();

  pageContent?.classList.add("page-content-leave");

  await new Promise(resolve => setTimeout(resolve, 220));

  try {
    await runPageScript(file);
    if (addHistory) history.pushState({page: file}, "", file);

    pageContent?.classList.remove("page-content-leave");
    pageContent?.classList.add("page-content-enter");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => pageContent?.classList.remove("page-content-enter"));
    });
    window.scrollTo({top: 0, behavior: "smooth"});
  } catch (error) {
    console.error(error);
    window.location.href = file;
  }
}

renderMenu();

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", event => {
    event.stopPropagation();
    const open = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
}

document.addEventListener("click", event => {
  const toggle = event.target.closest(".submenu-toggle");
  if (toggle) {
    event.stopPropagation();
    const parent = toggle.closest(".has-submenu");
    const open = parent.classList.toggle("submenu-open");
    toggle.setAttribute("aria-expanded", String(open));
    return;
  }

  const link = event.target.closest('a[href$=".html"]');
  if (link) {
    const url = new URL(link.href, window.location.href);
    if (url.origin === window.location.origin && PAGE_FILES[url.pathname.split("/").pop() || "index.html"] &&
        !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
      event.preventDefault();
      navigateTo(url.href, true);
      return;
    }
  }

  if (!event.target.closest(".has-submenu")) {
    document.querySelectorAll(".has-submenu").forEach(item => item.classList.remove("submenu-open"));
  }
});

window.addEventListener("popstate", () => navigateTo(currentFile(), false));

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// As páginas têm os seus próprios ficheiros de dados/renderização para garantir
// que o conteúdo original aparece mesmo no carregamento inicial.
// A navegação dinâmica só é usada depois do carregamento da página.
window.addEventListener("load", () => {
  renderMenu();
  closeMenus();
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
