const d = PAGE_DATA;

document.getElementById("page-content").innerHTML = `
  <section class="page-intro">
    <div class="container">
      <p class="eyebrow">${d.eyebrow}</p>
      <h1>${d.heading}</h1>
      <p>${d.intro}</p>
    </div>
  </section>

  <section class="section">
    <div class="container">

      <div class="section-heading">
        <p class="eyebrow">FOTOGRAFIAS</p>
        <h2>Momentos do projeto</h2>
        <p>Registo fotográfico das atividades, encontros e momentos de partilha.</p>
      </div>

      <div class="dissemination-photo-grid">
        ${d.photos.map((photo, index) => `
          <article class="dissemination-photo-card">
            <button class="dissemination-photo" type="button" onclick="openDisseminationPhoto(${index})">
              <img src="${photo.image}" alt="${photo.title}" loading="lazy">
            </button>
            <div class="dissemination-photo-caption">
              <h3>${photo.title}</h3>
              <p>${photo.description}</p>
            </div>
          </article>
        `).join("")}
      </div>

    </div>
  </section>

  <section class="section-soft">
    <div class="container">

      <div class="section-heading">
        <p class="eyebrow">LINKS</p>
        <h2>Recursos online</h2>
        <p>Aceda a páginas, plataformas e outros recursos relacionados com o projeto.</p>
      </div>

      <div class="dissemination-resource-grid">
        ${d.links.map(link => `
          <article class="dissemination-resource-card">
            <div class="resource-icon">🔗</div>
            <div>
              <h3>${link.title}</h3>
              <p>${link.description}</p>
              <a class="btn btn-outline dissemination-btn" href="${link.url}" target="_blank" rel="noopener">
                Aceder
              </a>
            </div>
          </article>
        `).join("")}
      </div>

    </div>
  </section>

  <section class="section">
    <div class="container">

      <div class="section-heading">
        <p class="eyebrow">DOCUMENTOS</p>
        <h2>Documentos PDF</h2>
        <p>Consulte os documentos e materiais produzidos no âmbito do projeto.</p>
      </div>

      <div class="dissemination-resource-grid">
        ${d.documents.map(document => `
          <article class="dissemination-resource-card">
            <div class="resource-icon">📄</div>
            <div>
              <h3>${document.title}</h3>
              <p>${document.description}</p>
              <a class="btn btn-outline dissemination-btn" href="${document.url}" target="_blank" rel="noopener">
                Abrir PDF
              </a>
            </div>
          </article>
        `).join("")}
      </div>

    </div>
  </section>

  <div id="dissemination-lightbox" class="gallery-lightbox" aria-hidden="true">
    <button class="gallery-close" type="button" onclick="closeDisseminationPhoto()" aria-label="Fechar">×</button>
    <img id="dissemination-large-image" src="" alt="">
  </div>
`;

let disseminationPhotoIndex = 0;

function openDisseminationPhoto(index) {
  disseminationPhotoIndex = index;
  const photo = d.photos[index];
  const lightbox = document.getElementById("dissemination-lightbox");
  const image = document.getElementById("dissemination-large-image");

  image.src = photo.image;
  image.alt = photo.title;
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeDisseminationPhoto() {
  const lightbox = document.getElementById("dissemination-lightbox");
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
}

document.addEventListener("keydown", function(event) {
  const lightbox = document.getElementById("dissemination-lightbox");

  if (!lightbox || !lightbox.classList.contains("active")) return;

  if (event.key === "Escape") {
    closeDisseminationPhoto();
  }
});
