import {moveInstrumentation} from "../../scripts/scripts.js";

export default function decorate(block) {
  const mockupContainer = document.createRange().createContextualFragment(`<div class='container' data-aue-type="container" data-aue-behavior="component" data-aue-label="Advantage Cards" data-aue-filter="advantage-cards" data-block-name="advantage-cards">
    <div class="carousel panelcontainer">
      <div class="section-heading content-center">
        <h2>Carousel 3D effect</h2>
      </div>
      <div
        class="cmp-carousel"
        role="group"
        aria-live="polite"
        aria-roledescription="carousel"
        data-cmp-is="carousel"
        data-cmp-delay="5000"
        data-carousel-effect="creative"
      >
        <div class="cmp-carousel__content">
        </div>

        <!-- Carousel actions - Previous/Next -->
        <div class="cmp-carousel__actions">
          <button class="cmp-carousel__action cmp-carousel__action--previous" type="button" aria-label="Previous">
            <span class="icon icon--arrow-left"></span>
          </button>
          <button class="cmp-carousel__action cmp-carousel__action--next" type="button" aria-label="Next">
            <span class="icon icon--arrow-right"></span>
          </button>
        </div>

        <!-- Pagination indicatoors -->
        <ol class="cmp-carousel__indicators" role="tablist" aria-label="Choose a slide to display"></ol>
      </div>
    </div>
  </div>`);

  const cardNodes = [...block.children].map((card) => {
    const safeText = (el, fallback = '') => el?.textContent?.trim() ?? fallback;

    const divs = card.querySelectorAll('div');
    const headline = safeText(divs.item(1));
    const details = safeText(divs.item(2));
    const navigate = safeText(divs.item(3));
    const mediaHTML = card.querySelector('picture')?.innerHTML ?? '';

    if (headline === '') return;

    const mockup = document.createRange().createContextualFragment(`
          <div class="cmp-carousel__item">
            <div class="cmp-advantage-card" 
            data-aue-type="container" data-aue-behavior="component" data-aue-label="Advantage Card" data-aue-filter="advantage-card" data-block-name="advantage-card">
              <div class="cmp-advantage-card__image-wrapper">
                ${mediaHTML}
                <video class="cmp-advantage-card__video" playsinline controls>
                  <source
                    type="video/mp4">
                  Your browser does not support the video tag.
                </video>
              </div>
              <div class="cmp-advantage-card__overlay">
                <div class="cmp-advantage-card__content">
                  <h3 class="cmp-advantage-card__title"  data-aue-prop="title" data-aue-label="Title" data-aue-type="text">${headline}</h3>
                  <p class="cmp-advantage-card__desc" data-aue-prop="details" data-aue-label="Details" data-aue-type="text">
                    ${details}
                  </p>
                  <button class="cmp-advantage-card__btn btn"  data-aue-prop="navigation" data-aue-label="Navigation" data-aue-type="text">${navigate}<img
                  alt="play-icon" /></button>
                </div>
              </div>
            </div>
          </div>`);

    moveInstrumentation(card, mockup);

    return mockup;
  });

  mockupContainer.querySelector('.cmp-carousel__content').append(...cardNodes);
  moveInstrumentation(block, mockupContainer);
  block.replaceWith(mockupContainer);
}
