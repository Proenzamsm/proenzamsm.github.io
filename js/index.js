const d=PAGE_DATA; document.title="Proenza Melhora a Saúde Mental"; document.getElementById("page-content").innerHTML=`<section class="hero"><div class="hero-overlay"></div><div class="container hero-content"><div class="hero-copy"><p class="eyebrow">${d.eyebrow}</p><h1>${d.heading}</h1><p class="hero-subtitle">${d.subtitle}</p><a class="btn btn-primary" href="${d.ctaHref}">${d.cta} <span>→</span></a></div><div class="hero-message"><span>“${d.quote}”</span><b>♡</b></div></div></section><section class="section-soft"><div class="container"><div class="section-heading centered"><p class="eyebrow">EXPLORE O PROJETO</p><h2>Conheça as nossas áreas</h2><p>Consulte cada página para descobrir os objetivos, atividades, resultados e formas de contacto.</p></div><div class="quick-grid">${d.areas.map(a=>`<a href="${a.href}" class="quick-card"><span>${a.icon}</span><strong>${a.title}</strong><small>${a.text}</small></a>`).join("")}</div></div></section>`;\nexport function render(container, data) {
  container.innerHTML = "";
  const title = document.createElement("h1");
  title.textContent = data.title || data.titulo || "Index";
  container.appendChild(title);
  const body = document.createElement("div");
  body.className = "page-data";
  body.textContent = data.content || data.conteudo || data.text || "";
  container.appendChild(body);
}\n