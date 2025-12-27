import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  // Apply Tailwind CSS classes to ul
  // Note: grid-template-columns is defined in cards.css
  ul.className = 'list-none m-0 p-0 grid gap-6';

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    // Apply Tailwind CSS classes to li
    li.className = 'border border-gray-300 bg-white';

    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        // Apply Tailwind CSS classes for card image container
        div.className = 'leading-none';
      } else {
        // Apply Tailwind CSS classes for card body
        div.className = 'm-4';
      }
    });
    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    // Apply Tailwind CSS classes to images
    // Note: aspect-ratio is defined in cards.css
    img.className = 'w-full object-cover';

    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    const optimizedImg = optimizedPic.querySelector('img');
    // Apply Tailwind CSS classes to optimized image
    optimizedImg.className = 'w-full object-cover';

    moveInstrumentation(img, optimizedImg);
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(ul);
}
