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


/*
  Desenha o menu.
  Pode receber diretamente o ficheiro da página atual,
  evitando qualquer atraso na barra laranja.
*/

function renderMenu(activePage = currentFile()) {

  if (!mainNav || !window.MENU) return;

  mainNav.innerHTML = window.MENU.map(item => {

    /*
      Item com submenu
    */

    if (item.submenu) {

      const submenuActive = item.submenu.some(
        sub => sub.href === activePage
      );

      return `
        <div class="has-submenu">

          <div class="submenu-main">

            <span class="submenu-label ${submenuActive ? "active" : ""}">
              ${item.label}
            </span>

            <button
              class="submenu-toggle"
              type="button"
              aria-expanded="false"
              aria-label="Abrir submenu ${item.label}"
            >
              <span class="submenu-arrow">▾</span>
            </button>

          </div>

          <div class="submenu">

            ${item.submenu.map(sub => `
              <a
                href="${sub.href}"
                class="${sub.href === activePage ? "active" : ""}"
              >
                ${sub.label}
              </a>
            `).join("")}

          </div>

        </div>
      `;
    }


    /*
      Item normal
    */

    return `
      <a
        href="${item.href}"
        class="${item.href === activePage ? "active" : ""}"
      >
        ${item.label}
      </a>
    `;

  }).join("");
}


/*
  Fecha o menu mobile e os submenus.
*/

function closeMenus() {

  mainNav?.classList.remove("open");

  menuToggle?.setAttribute(
    "aria-expanded",
    "false"
  );

  document.querySelectorAll(".has-submenu").forEach(item => {

    item.classList.remove("submenu-open");

    item
      .querySelector(".submenu-toggle")
      ?.setAttribute(
        "aria-expanded",
        "false"
      );

  });

}


/*
  Carrega os dados e o JavaScript
  correspondente à página.
*/

function runPageScript(page) {

  const base = PAGE_FILES[page];

  if (!base) {

    return Promise.reject(
      new Error(
        "Página não encontrada: " + page
      )
    );

  }


  return Promise.all([

    fetch(`dados/${base}.js`).then(r => {

      if (!r.ok) {

        throw new Error(
          `Não foi possível carregar dados/${base}.js`
        );

      }

      return r.text();

    }),

    fetch(`js/${base}.js`).then(r => {

      if (!r.ok) {

        throw new Error(
          `Não foi possível carregar js/${base}.js`
        );

      }

      return r.text();

    })

  ]).then(([dataCode, pageCode]) => {

    window.PAGE_DATA = undefined;

    new Function(dataCode)();

    new Function(pageCode)();

    document.body.dataset.page = base;

    /*
      IMPORTANTE:
      Não desenhamos o menu aqui.
      O menu será atualizado depois,
      já sabendo exatamente qual é a página ativa.
    */

  });

}


/*
  Navegação entre páginas.
*/

async function navigateTo(
  href,
  addHistory = true
) {

  const url = new URL(
    href,
    window.location.href
  );

  if (
    url.origin !== window.location.origin
  ) {
    return;
  }


  const file =
    url.pathname.split("/").pop()
    || "index.html";


  if (!PAGE_FILES[file]) {
    return;
  }


  if (
    file === currentFile() &&
    !addHistory
  ) {
    return;
  }


  closeMenus();


  /*
    Animação de saída
  */

  pageContent?.classList.add(
    "page-content-leave"
  );


  await new Promise(resolve =>
    setTimeout(resolve, 220)
  );


  try {

    /*
      Carrega primeiro o conteúdo da página.
    */

    await runPageScript(file);


    /*
      Atualiza o endereço.
    */

    if (addHistory) {

      history.pushState(
        { page: file },
        "",
        file
      );

    }


    /*
      AGORA sabemos exatamente qual é a página ativa.
      Não dependemos de currentFile().
    */

    renderMenu(file);


    /*
      Fecha menus depois de reconstruir
      a navegação.
    */

    closeMenus();


    /*
      Animação de entrada
    */

    pageContent?.classList.remove(
      "page-content-leave"
    );

    pageContent?.classList.add(
      "page-content-enter"
    );


    requestAnimationFrame(() => {

      requestAnimationFrame(() => {

        pageContent?.classList.remove(
          "page-content-enter"
        );

      });

    });


    /*
      Voltar ao topo.
    */

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });


  } catch (error) {

    console.error(error);

    window.location.href = file;

  }

}


/*
  Primeiro carregamento da página.
*/

renderMenu(currentFile());


/*
  Menu mobile.
*/

if (menuToggle && mainNav) {

  menuToggle.addEventListener(
    "click",
    event => {

      event.stopPropagation();

      const open =
        mainNav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(open)
      );

    }
  );

}


/*
  Cliques no menu e nos submenus.
*/

document.addEventListener(
  "click",
  event => {

    /*
      Abrir / fechar submenu
      apenas através da seta.
    */

    const toggle =
      event.target.closest(
        ".submenu-toggle"
      );


    if (toggle) {

      event.stopPropagation();

      const parent =
        toggle.closest(
          ".has-submenu"
        );


      const open =
        parent.classList.toggle(
          "submenu-open"
        );


      toggle.setAttribute(
        "aria-expanded",
        String(open)
      );


      return;

    }


    /*
      Clique num link de página.
    */

    const link =
      event.target.closest(
        'a[href$=".html"]'
      );


    if (link) {

      const url =
        new URL(
          link.href,
          window.location.href
        );


      const file =
        url.pathname.split("/").pop()
        || "index.html";


      if (
        url.origin === window.location.origin &&
        PAGE_FILES[file] &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.shiftKey &&
        !event.altKey
      ) {

        event.preventDefault();

        navigateTo(
          url.href,
          true
        );

        return;

      }

    }


    /*
      Clique fora do submenu:
      fecha-o.
    */

    if (
      !event.target.closest(
        ".has-submenu"
      )
    ) {

      document
        .querySelectorAll(
          ".has-submenu"
        )
        .forEach(item => {

          item.classList.remove(
            "submenu-open"
          );


          item
            .querySelector(
              ".submenu-toggle"
            )
            ?.setAttribute(
              "aria-expanded",
              "false"
            );

        });

    }

  }
);


/*
  Botões Voltar / Avançar do navegador.
*/

window.addEventListener(
  "popstate",
  async () => {

    const file = currentFile();

    if (!PAGE_FILES[file]) {
      return;
    }

    try {

      await runPageScript(file);

      /*
        No popstate o endereço já foi alterado
        pelo navegador, portanto usamos diretamente
        o ficheiro atual.
      */

      renderMenu(file);

      closeMenus();

      pageContent?.classList.remove(
        "page-content-leave"
      );

      pageContent?.classList.add(
        "page-content-enter"
      );

      requestAnimationFrame(() => {

        requestAnimationFrame(() => {

          pageContent?.classList.remove(
            "page-content-enter"
          );

        });

      });

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    } catch (error) {

      console.error(error);

      window.location.reload();

    }

  }
);


/*
  Ano do footer.
*/

const year =
  document.getElementById("year");

if (year) {

  year.textContent =
    new Date().getFullYear();

}


/*
  Garantir que o menu fica correto
  depois do carregamento inicial.
*/

window.addEventListener(
  "load",
  () => {

    renderMenu(currentFile());

    closeMenus();

    const year =
      document.getElementById("year");

    if (year) {

      year.textContent =
        new Date().getFullYear();

    }

  }
);
