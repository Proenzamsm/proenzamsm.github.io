const d=PAGE_DATA; document.getElementById("page-content").innerHTML=`<section class="page-intro"><div class="container"><p class="eyebrow">${d.eyebrow}</p><h1>${d.heading}</h1><p>${d.intro}</p></div></section><section class="section-soft"><div class="container"><div class="cards three">${d.items.map((x,i)=>`<article class="objective-card"><div class="icon-circle ${["blue","green","purple"][i]}">${["🧠","☺","⌁"][i]}</div><div><span class="number">${x.n}</span><h3>${x.title}</h3><p>${x.text}</p></div></article>`).join("")}</div></div></section>`;\nexport function render(container, data) {
  container.innerHTML = "";
  const title = document.createElement("h1");
  title.textContent = data.title || data.titulo || "Objetivos";
  container.appendChild(title);
  const body = document.createElement("div");
  body.className = "page-data";
  body.textContent = data.content || data.conteudo || data.text || "";
  container.appendChild(body);
}\n