import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  console.log('>>>> advantage-cards');
  [...block.children].forEach((card) => {
    let image;
    let body;
    let title;
    let cta;

    [...card.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        image = div;
        image.className = 'cards-card-image';
      } else{
        body = div;
        body.className = 'cards-card-body';
      }
    });
    console.log('>>>> advantage-cards >>', card);
  });
}
