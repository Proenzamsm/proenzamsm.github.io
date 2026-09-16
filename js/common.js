const nav = document.getElementById("main-nav");

if (nav && window.MENU) {

  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  nav.innerHTML = MENU.map(item => {

    // Item com submenu
    if (item.submenu) {

      const submenuActive = item.submenu.some(
        sub => sub.href === currentPage
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
                class="${sub.href === currentPage ? "active" : ""}"
              >
                ${sub.label}
              </a>
            `).join("")}

          </div>

        </div>
      `;
    }

    // Item normal
    return `
      <a
        href="${item.href}"
        class="${item.href === currentPage ? "active" : ""}"
      >
        ${item.label}
      </a>
    `;

  }).join("");
}


// Abrir / fechar o submenu apenas ao clicar na seta
document.querySelectorAll(".submenu-toggle").forEach(button => {

  button.addEventListener("click", event => {

    event.stopPropagation();

    const parent = button.closest(".has-submenu");
    const isOpen = parent.classList.toggle("submenu-open");

    button.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

  });

});


// Fechar submenu quando se clica fora
document.addEventListener("click", event => {

  document.querySelectorAll(".has-submenu").forEach(parent => {

    if (!parent.contains(event.target)) {

      parent.classList.remove("submenu-open");

      const button = parent.querySelector(".submenu-toggle");

      if (button) {
        button.setAttribute("aria-expanded", "false");
      }

    }

  });

});


// Menu mobile
const menuToggle = document.querySelector(".menu-toggle");

if (menuToggle && nav) {

  menuToggle.addEventListener("click", () => {

    const isOpen = nav.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

  });

}


// Transição suave entre páginas
document.addEventListener("DOMContentLoaded", () => {

  document.body.classList.remove("page-leave");

  document.querySelectorAll("a[href]").forEach(link => {

    const href = link.getAttribute("href");

    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("http") ||
      href.startsWith("mailto:")
    ) {
      return;
    }

    link.addEventListener("click", event => {

      if (
        event.ctrlKey ||
        event.shiftKey ||
        event.metaKey ||
        event.altKey
      ) {
        return;
      }

      event.preventDefault();

      document.body.classList.add("page-leave");

      setTimeout(() => {
        window.location.href = href;
      }, 300);

    });

  });

});
