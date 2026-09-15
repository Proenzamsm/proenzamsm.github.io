const d=PAGE_DATA; document.getElementById("page-content").innerHTML=`<section class="page-intro"><div class="container"><p class="eyebrow">${d.eyebrow}</p><h1>${d.heading}</h1><p>${d.intro}</p></div></section><section class="section"><div class="container"><div class="topic-grid">${d.items.map(x=>`<article><span>${x.icon}</span><h3>${x.title}</h3><p>${x.text}</p></article>`).join("")}</div></div></section>`;\nexport function render(container, data) {
  container.innerHTML = "";
  const title = document.createElement("h1");
  title.textContent = data.title || data.titulo || "Atividades";
  container.appendChild(title);
  const body = document.createElement("div");
  body.className = "page-data";
  body.textContent = data.content || data.conteudo || data.text || "";
  container.appendChild(body);
}\n