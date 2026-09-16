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

  <div id="gallery-lightbox" class="gallery-lightbox">

    <button class="gallery-close" onclick="closeGallery()">
      ×
    </button>

    <button class="gallery-prev" onclick="previousImage()">
      ‹
    </button>

    <img id="gallery-large-image" src="" alt="">

    <button class="gallery-next" onclick="nextImage()">
      ›
    </button>

  </div>
`;


let currentMobility = 0;
let currentImage = 0;


function openGallery(mobilityIndex, imageIndex) {
  currentMobility = mobilityIndex;
  currentImage = imageIndex;

  updateGallery();

  document
    .getElementById("gallery-lightbox")
    .classList.add("active");
}


function closeGallery() {
  document
    .getElementById("gallery-lightbox")
    .classList.remove("active");
}


function updateGallery() {
  const image =
    d.mobilities[currentMobility].images[currentImage];

  const largeImage =
    document.getElementById("gallery-large-image");

  largeImage.src = image;
  largeImage.alt =
    d.mobilities[currentMobility].title +
    " - fotografia " +
    (currentImage + 1);
}


function nextImage() {
  const images =
    d.mobilities[currentMobility].images;

  currentImage++;

  if (currentImage >= images.length) {
    currentImage = 0;
  }

  updateGallery();
}


function previousImage() {
  const images =
    d.mobilities[currentMobility].images;

  currentImage--;

  if (currentImage < 0) {
    currentImage = images.length - 1;
  }

  updateGallery();
}


document.addEventListener("keydown", function(event) {

  const lightbox =
    document.getElementById("gallery-lightbox");

  if (!lightbox.classList.contains("active")) {
    return;
  }

  if (event.key === "Escape") {
    closeGallery();
  }

  if (event.key === "ArrowRight") {
    nextImage();
  }

  if (event.key === "ArrowLeft") {
    previousImage();
  }

});
