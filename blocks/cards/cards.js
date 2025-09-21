import {createOptimizedPicture} from '../../scripts/aem.js';
import {moveInstrumentation} from '../../scripts/scripts.js';

export default function decorate(block) {
  console.log('jquery version------------------------------');
  console.log('jquery >>', window.$);
  const {$} = window;
  const $block = $(block);

  const $ul = $('<ul>');
  [...block.children].forEach((row) => {
    const $row = $(row);
    const $li = $('<li>');
    // moveInstrumentation(row, $li[0]);
    $row.find('picture').addClass('cards-card-image');

    $row.find('picture > img').each((index, img) => {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{width: '750'}]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      img.closest('picture').replaceWith(optimizedPic);
    });
    $li.append($row.first());
    $ul.append($li);
  });
  $block.empty();
  $block.append($ul);

  // console.log('vanilla version------------------------------');
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
  //   const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{width: '750'}]);
  //   moveInstrumentation(img, optimizedPic.querySelector('img'));
  //   img.closest('picture').replaceWith(optimizedPic);
  // });
  // block.textContent = '';
  // block.append(ul);
}
