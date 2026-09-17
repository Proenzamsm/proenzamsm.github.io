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
      <div class="mobility-list">
        ${d.mobilities.map((mobility, mobilityIndex) => `
          <article class="mobility-block">
            <div class="mobility-header">
              <p class="eyebrow">MOBILIDADE ${String(mobilityIndex + 1).padStart(2, "0")}</p>
              <h2>${mobility.title}</h2>
              <p class="mobility-location">${mobility.location}</p>
              <p>${mobility.description}</p>
            </div>

            <div class="gallery-grid">
              ${mobility.images.map((image, imageIndex) => `
                <figure class="gallery-item">
                  <img
                    src="${image}"
                    alt="${mobility.title} - fotografia ${imageIndex + 1}"
                    loading="lazy"
                    onclick="openGallery(${mobilityIndex}, ${imageIndex})"
                  >
                </figure>
              `).join("")}
            </div>
          </article>
        `).join("")}
      </div>
    </div>
  </section>

  <div id="gallery-lightbox" class="gallery-lightbox" aria-hidden="true">
    <button class="gallery-close" onclick="closeGallery()" aria-label="Fechar">×</button>
    <button class="gallery-prev" onclick="previousImage()" aria-label="Fotografia anterior">‹</button>
    <img id="gallery-large-image" src="" alt="">
    <button class="gallery-next" onclick="nextImage()" aria-label="Fotografia seguinte">›</button>
  </div>
`;

let currentMobility = 0;
let currentImage = 0;

function openGallery(mobilityIndex, imageIndex) {
  currentMobility = mobilityIndex;
  currentImage = imageIndex;
  updateGallery();

  const lightbox = document.getElementById("gallery-lightbox");
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeGallery() {
  const lightbox = document.getElementById("gallery-lightbox");
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
}

function updateGallery() {
  const image = d.mobilities[currentMobility].images[currentImage];
  const largeImage = document.getElementById("gallery-large-image");

  largeImage.src = image;
  largeImage.alt =
    d.mobilities[currentMobility].title +
    " - fotografia " +
    (currentImage + 1);
}

function nextImage() {
  const images = d.mobilities[currentMobility].images;
  currentImage = (currentImage + 1) % images.length;
  updateGallery();
}

function previousImage() {
  const images = d.mobilities[currentMobility].images;
  currentImage = (currentImage - 1 + images.length) % images.length;
  updateGallery();
}

document.addEventListener("keydown", function(event) {
  const lightbox = document.getElementById("gallery-lightbox");

  if (!lightbox || !lightbox.classList.contains("active")) return;

  if (event.key === "Escape") closeGallery();
  if (event.key === "ArrowRight") nextImage();
  if (event.key === "ArrowLeft") previousImage();
});

document.getElementById("gallery-lightbox").addEventListener("click", function(event) {
  if (event.target === this) closeGallery();
});
