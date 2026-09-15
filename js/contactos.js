const d=PAGE_DATA; document.getElementById("page-content").innerHTML=`<section class="page-intro"><div class="container"><p class="eyebrow">${d.eyebrow}</p><h1>${d.heading}</h1><p>${d.intro}</p></div></section><section class="contact section-dark"><div class="container contact-grid"><div><p class="eyebrow light">PROEZA ASSOCIAÇÃO ALTRUÍSTA</p><h2>Juntos por uma comunidade mais saudável.</h2><p>Projeto Erasmus+ de Educação de Adultos promovido pela Associação Cultural Proeza Altruísta.</p></div><div class="contact-box"><strong>${d.project}</strong><span>Projeto: ${d.code}</span><span>${d.location}</span><a href="mailto:${d.email}">Contactar</a></div></div></section>`;\nexport function render(container, data) {
  container.innerHTML = "";
  const title = document.createElement("h1");
  title.textContent = data.title || data.titulo || "Contactos";
  container.appendChild(title);
  const body = document.createElement("div");
  body.className = "page-data";
  body.textContent = data.content || data.conteudo || data.text || "";
  container.appendChild(body);
}\n