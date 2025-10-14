// eslint-disable-next-line import/extensions

export const TemplateCard = `<div class="cmp-advantage-card">
  <div class="cmp-advantage-card__image-wrapper">
    <img
      src="/content/dam/eds-enablement-xwalk/asus-cto-sites/advantage.jpg"
      alt="Ultimate Gaming Experience"
      class="cmp-advantage-card__image"
    />
    <video class="cmp-advantage-card__video" playsinline controls>
      <source src="/content/dam/eds-enablement-xwalk/asus-cto-sites/videos/hero-banner-video-1.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
  <div class="cmp-advantage-card__overlay">
    <div class="cmp-advantage-card__content">
      <h3 class="cmp-advantage-card__title">Ultimate Gaming Experience</h3>
      <p class="cmp-advantage-card__desc">
        Our systems are engineered to enhance both performance and noise control, guaranteeing
        stability and an unparalleled gaming experience.
      </p>
      <button class="cmp-advantage-card__btn btn">Watch now <img src="/content/dam/eds-enablement-xwalk/asus-cto-sites/icon-play-filled.svg" alt="play-icon" /></button>
    </div>
  </div>
</div>`;
export const TemplateCarousel = `<div class='container'>
    <div class="carousel panelcontainer">
      <div class="section-heading content-center">
        <h2>Carousel 3D effect</h2>
      </div>
      <div
        id="carousel-4e80c7e13a"
        class="cmp-carousel"
        role="group"
        aria-live="polite"
        aria-roledescription="carousel"
        data-cmp-is="carousel"
        data-cmp-delay="5000"
        data-carousel-effect="creative"
      >
        <div class="cmp-carousel__content">
          <div id="carousel-4e80c7e13a-item-30704e84cd-tabpanel" class="cmp-carousel__item cmp-carousel__item--active">
          </div>
          <div id="carousel-4e80c7e13a-item-645fc67b90-tabpanel" class="cmp-carousel__item">
          </div>
          <div id="carousel-4e80c7e13a-item-85d21a3332-tabpanel" class="cmp-carousel__item">
          </div>
          <div id="carousel-4e80c7e13a-item-85d21a3334-tabpanel" class="cmp-carousel__item">
          </div>
          <div id="carousel-4e80c7e13a-item-85d21a3335-tabpanel" class="cmp-carousel__item">
          </div>
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
  </div>`;

function renderCardWithPicture(templateHtml, pictureEl) {
  const tpl = document.createElement('template');
  tpl.innerHTML = templateHtml.trim();

  const root = tpl.content.firstElementChild; // .cmp-advantage-card
  const imgEl = root.querySelector('.cmp-advantage-card__image');

  if (imgEl && pictureEl) {
    const pictureClone = pictureEl.cloneNode(true);
    // 若樣式原本綁在圖片上，需要可選擇把 class 搬到 <picture> 或其內的 <img>
    // pictureClone.classList.add('cmp-advantage-card__image');
    imgEl.replaceWith(pictureClone);
  }

  // 回傳 Element，後續可直接 append 到 DOM，或使用 outerHTML 拿字串
  return root;
}


export default function decorate(block) {
  console.log('>>>> advantage-cards');

  // ----------------------------------------------------
  // get content
  // ----------------------------------------------------
  [...block.children].forEach((card, index) => {

      const firstDiv = card.children[0];
      const secondDiv = card.children[1];
      const thirdDiv = card.children[2];

      const pictureEl = firstDiv?.querySelector('picture') || null;
      const imgEl = pictureEl?.querySelector('img') || null;

      const titleEl = secondDiv?.querySelector('h3') || null;
      const descEl = secondDiv?.querySelector('p') || null;

    let output = renderCardWithPicture(TemplateCard, pictureEl);


    console.log('>>>> advantage-cards >> card', card);
    console.log('>>>> advantage-cards >> output', output);
  });

  // ----------------------------------------------------
  // transform content
  // ----------------------------------------------------

}
