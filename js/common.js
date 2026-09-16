const nav = document.getElementById("main-nav");

if (nav && window.MENU) {

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  nav.innerHTML = MENU.map(item => {

    // Item com submenu
    if (item.submenu) {

      const submenuActive = item.submenu.some(
        sub => sub.href === currentPage
      );

      return `
        <div class="has-submenu">

          <button
            class="submenu-toggle ${submenuActive ? "active" : ""}"
            type="button"
            aria-expanded="false"
          >
            <span>${item.label}</span>
            <span class="submenu-arrow">▾</span>
          </button>

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

    // Item normal do menu
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

      if (event.ctrlKey || event.shiftKey || event.metaKey || event.altKey) {
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
