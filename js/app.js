(function () {
  "use strict";

  var content = document.getElementById("page-content");
  var menuEl = document.getElementById("main-menu");

  var pages = {
    inicio: { label: "Início", file: "js/index.js" },
    projeto: { label: "Projeto", file: "js/projeto.js" },
    objetivos: { label: "Objetivos", file: "js/objetivos.js" },
    atividades: { label: "Atividades", file: "js/atividades.js" },
    resultados: { label: "Resultados", file: "js/resultados.js" },
    contactos: { label: "Contactos", file: "js/contactos.js" }
  };

  function makeMenu() {
    Object.keys(pages).forEach(function (id) {
      var a = document.createElement("a");
      a.href = "#" + id;
      a.textContent = pages[id].label;
      a.setAttribute("data-page", id);
      menuEl.appendChild(a);
    });
  }

  function setActive(id) {
    menuEl.querySelectorAll("a").forEach(function (a) {
      var active = a.getAttribute("data-page") === id;
      a.classList.toggle("active", active);
      if (active) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  function loadScript(src, done) {
    var old = document.getElementById("page-script");
    if (old) old.remove();

    var script = document.createElement("script");
    script.id = "page-script";
    script.src = src;
    script.onload = function () { done(null); };
    script.onerror = function () { done(new Error("Não foi possível carregar " + src)); };
    document.body.appendChild(script);
  }

  function loadPage(id) {
    if (!pages[id]) id = "inicio";
    setActive(id);
    content.classList.add("is-changing");

    window.setTimeout(function () {
      content.innerHTML = "";
      loadScript(pages[id].file, function (err) {
        content.classList.remove("is-changing");
        if (err) {
          content.innerHTML = "<p>Não foi possível carregar esta página.</p>";
          console.error(err);
        }
      });
    }, 150);
  }

  makeMenu();
  window.addEventListener("hashchange", function () {
    loadPage((location.hash || "#inicio").slice(1));
  });
  loadPage((location.hash || "#inicio").slice(1));
}());
