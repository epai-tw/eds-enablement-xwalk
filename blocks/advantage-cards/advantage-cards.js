import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  console.log('>>>> advantage-cards');
  [...block.children].forEach((card) => {
    console.log('>>>> advantage-cards >>', card);
    
  });
}
