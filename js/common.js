const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const currentPage = document.body.dataset.page + ".html";
if (window.SITE_MENU && mainNav) {
  mainNav.innerHTML = window.SITE_MENU.map(item => `<a class="${item.href === currentPage ? "active" : ""}" href="${item.href}">${item.label}</a>`).join("");
}
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => { const open = mainNav.classList.toggle("open"); menuToggle.setAttribute("aria-expanded", String(open)); });
}
document.querySelectorAll(".main-nav a").forEach(link => link.addEventListener("click", () => { mainNav?.classList.remove("open"); menuToggle?.setAttribute("aria-expanded", "false"); }));
document.querySelectorAll('a[href$=".html"]').forEach(link => link.addEventListener("click", event => {
  const url = new URL(link.href, window.location.href);
  if (url.origin === window.location.origin && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
    event.preventDefault(); document.body.classList.add("page-leave"); setTimeout(() => { window.location.href = url.href; }, 300);
  }
}));
const year = document.getElementById("year"); if (year) year.textContent = new Date().getFullYear();
