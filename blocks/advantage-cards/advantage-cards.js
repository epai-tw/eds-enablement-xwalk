// eslint-disable-next-line import/extensions

export const TemplateCard = `<div class="cmp-carousel__item"><div class="cmp-advantage-card">
  <div class="cmp-advantage-card__image-wrapper">
    <img
      alt="Ultimate Gaming Experience"
      class="cmp-advantage-card__image"
    />
    <video class="cmp-advantage-card__video" playsinline controls>
      <source 
        type="video/mp4">
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
      <button class="cmp-advantage-card__btn btn">Watch now <img
      alt="play-icon" /></button>
    </div>
  </div>
</div></div>`;
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

function renderCard(templateHtml, { pictureEl, titleEl }) {
  const tpl = document.createElement('template');
  tpl.innerHTML = templateHtml.trim();

  const root = tpl.content.firstElementChild;

  // 1) 替換圖片
  const imgEl = root.querySelector('.cmp-advantage-card__image');
  if (imgEl && pictureEl) {
    const pictureClone = pictureEl.cloneNode(true);

    // 確保樣式 class 存在於實際顯示的 <img> 上；若沒有 <img>，就加在 clone 本身
    const innerImg = pictureClone.querySelector?.('img');
    if (innerImg) {
      innerImg.classList.add('cmp-advantage-card__image');
    } else {
      pictureClone.classList.add('cmp-advantage-card__image');
    }

    imgEl.replaceWith(pictureClone);
  }

  // 2) 替換標題
  const titleTarget = root.querySelector('.cmp-advantage-card__title');
  if (titleTarget && titleEl) {
    const titleClone = titleEl.cloneNode(true);
    // 保留樣式 class
    titleClone.classList.add('cmp-advantage-card__title');
    titleTarget.replaceWith(titleClone);
  }

  return root;
}

/**
 * @param {string} htmlString - 包含 HTML 結構的純文字字串
 * @returns {DocumentFragment} - 包含所有解析後 DOM 節點的文件片段
 */
function createFragmentFromHTML(htmlString) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;
  const fragment = document.createDocumentFragment();
  while (tempDiv.firstChild) {
    fragment.appendChild(tempDiv.firstChild);
  }
  return fragment;
}

export default function decorate(block) {
  console.log('>>>> advantage-cards');


  // ----------------------------------------------------
  // get content
  // ----------------------------------------------------

  // const fragmentCard = createFragmentFromHTML(TemplateCard);
  // //
  // const contentEl = fragmentCard.querySelector('.cmp-carousel__content');
  // console.log('fragment', fragmentCard.toString());
  // if (!contentEl) {
  //   throw new Error('Carousel content container (.cmp-carousel__content) not found.');
  // }
  //
  // const cardNodes = [...block.children].map((card) =>
  //   {
  //     const picture = block.querySelector('picture');
  //     const subhead = block.querySelectorAll('div')[1].textContent;
  //     const searchplaceholder = block.querySelectorAll('p')[2].textContent;
  //     const buttontext = block.querySelectorAll('p')[3].textContent;
  //
  //     const firstDiv = card.children[0];
  //     const secondDiv = card.children[1];
  //     const thirdDiv = card.children[2];
  //     console.log('>>>> map > firstDiv', firstDiv);
  //
  //     const pictureEl = firstDiv?.querySelector('picture') || null;
  //     const imgEl = pictureEl?.querySelector('img') || null;
  //
  //     const titleEl = secondDiv?.querySelector('h3') || null;
  //     const descEl = secondDiv?.querySelector('p') || null;
  //
  //     let newCard = renderCard(TemplateCard,{ pictureEl, titleEl });
  //     console.log('>>>> map', newCard);
  //     return newCard;
  //   }
  // );
  // //
  // console.log('>>>> advantage-cards >> cardNodes', cardNodes);
  // // //
  // contentEl.append(...cardNodes);
  // console.log('>>>> advantage-cards >> contentEl', contentEl);
  // // console.log('>>>> advantage-cards >> tpl', tpl);
  // // block.append(cardNodes);
  // // block.textContent = '';
  // // block.append(tpl);

}
