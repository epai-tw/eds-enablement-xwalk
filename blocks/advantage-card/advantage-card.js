// eslint-disable-next-line import/extensions

export default function decorate(block) {

  const mockupContainer = document.createRange().createContextualFragment(`<div class='container'>
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
    const media = card.querySelector('picture');
    const headline = card.querySelectorAll('div')[1].textContent;
    const details = card.querySelectorAll('div')[2].textContent;
    const navigate = card.querySelectorAll('div')[3].textContent;

    const mockup = document.createRange().createContextualFragment(`
          <div class="cmp-carousel__item">
            <div class="cmp-advantage-card">
              <div class="cmp-advantage-card__image-wrapper">
                ${media.innerHTML}
                <video class="cmp-advantage-card__video" playsinline controls>
                  <source
                    type="video/mp4">
                  Your browser does not support the video tag.
                </video>
              </div>
              <div class="cmp-advantage-card__overlay">
                <div class="cmp-advantage-card__content">
                  <h3 class="cmp-advantage-card__title">${headline}</h3>
                  <p class="cmp-advantage-card__desc">
                    ${details}
                  </p>
                  <button class="cmp-advantage-card__btn btn">${navigate}<img
                  alt="play-icon" /></button>
                </div>
              </div>
            </div>
          </div>`);

    return mockup;
  });

  mockupContainer.querySelector('.cmp-carousel__content').append(...cardNodes);
  block.replaceWith(mockupContainer);
}
