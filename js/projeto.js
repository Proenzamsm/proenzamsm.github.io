const d=PAGE_DATA; document.getElementById("page-content").innerHTML=`<section class="page-intro"><div class="container"><p class="eyebrow">${d.eyebrow}</p><h1>${d.heading}</h1><p>${d.intro}</p></div></section><section class="section"><div class="container about-grid"><div class="about-copy">${d.paragraphs.map(p=>`<p>${p}</p>`).join("")}<a class="btn btn-outline" href="atividades.html">Conhecer as atividades <span>→</span></a></div><aside class="project-info"><div class="erasmus-badge"><span class="eu-flag">★</span><div><strong>Erasmus+</strong><small>Enriquecer vidas, alargar horizontes.</small></div></div>${d.info.map(x=>{let [a,b]=x.split('|');return `<div class="info-row"><span>▣</span><div><strong>${a}</strong><small>${b}</small></div></div>`}).join("")}</aside></div></section>`;\nexport function render(container, data) {
  container.innerHTML = "";
  const title = document.createElement("h1");
  title.textContent = data.title || data.titulo || "Projeto";
  container.appendChild(title);
  const body = document.createElement("div");
  body.className = "page-data";
  body.textContent = data.content || data.conteudo || data.text || "";
  container.appendChild(body);
}\n