(function () {
  var root = document.getElementById("page-content");
  var section = document.createElement("section");
  section.className = "page-section";
  var h1 = document.createElement("h1");
  h1.textContent = "Início";
  section.appendChild(h1);
  var p = document.createElement("p");
  p.textContent = "Conteúdo da página index.";
  section.appendChild(p);
  root.appendChild(section);
})();
