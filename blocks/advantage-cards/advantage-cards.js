import { TemplateCard, TemplateCarousel } from './advantage-cards-helper';

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
