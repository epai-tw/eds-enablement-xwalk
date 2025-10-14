import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  console.log('>>>> advantage-cards');
//
//   const [wrapper] = block.children;
//   const carousel = document.createElement('carousel');
//   const card = `<div class="cmp-advantage-card">
//   <div class="cmp-advantage-card__image-wrapper">
//     <img
//       src="/content/dam/eds-enablement-xwalk/asus-cto-sites/advantage.jpg"
//       alt="Ultimate Gaming Experience"
//       class="cmp-advantage-card__image"
//     />
//     <video class="cmp-advantage-card__video" playsinline controls>
//       <source src="/content/dam/eds-enablement-xwalk/asus-cto-sites/videos/hero-banner-video-1.mp4" type="video/mp4">
//       Your browser does not support the video tag.
//     </video>
//   </div>
//   <div class="cmp-advantage-card__overlay">
//     <div class="cmp-advantage-card__content">
//       <h3 class="cmp-advantage-card__title">Ultimate Gaming Experience</h3>
//       <p class="cmp-advantage-card__desc">
//         Our systems are engineered to enhance both performance and noise control, guaranteeing
//         stability and an unparalleled gaming experience.
//       </p>
//       <button class="cmp-advantage-card__btn btn">Watch now <img src="/content/dam/eds-enablement-xwalk/asus-cto-sites/icon-play-filled.svg" alt="play-icon" /></button>
//     </div>
//   </div>
// </div>`;


  // /* change to ul, li */
  // const ul = document.createElement('ul');
  // [...block.children].forEach((row) => {
  //   const li = document.createElement('li');
  //   moveInstrumentation(row, li);
  //   while (row.firstElementChild) li.append(row.firstElementChild);
  //   [...li.children].forEach((div) => {
  //     if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
  //     else div.className = 'cards-card-body';
  //   });
  //   ul.append(li);
  // });
  // ul.querySelectorAll('picture > img').forEach((img) => {
  //   const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
  //   moveInstrumentation(img, optimizedPic.querySelector('img'));
  //   img.closest('picture').replaceWith(optimizedPic);
  // });
  // block.textContent = '';
  // block.append(ul);
}
