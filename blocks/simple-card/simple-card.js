import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Get the authored content (first row contains image and heading)
  const row = block.firstElementChild;
  if (!row) return;

  const cells = [...row.children];
  let imageElement = null;
  let headingText = '';

  // Extract image and heading from authored cells
  cells.forEach((cell) => {
    const picture = cell.querySelector('picture');
    const img = cell.querySelector('img');
    
    if (picture || img) {
      imageElement = picture || img;
    } else if (cell.textContent.trim()) {
      headingText = cell.textContent.trim();
    }
  });

  // Use static HTML template
  block.innerHTML = `
    <div class="simple-card-container">
      <div class="simple-card-image"></div>
      <div class="simple-card-content">
        <h3 class="simple-card-heading"></h3>
      </div>
    </div>
  `;

  // Populate the static HTML with authored content
  const imageSection = block.querySelector('.simple-card-image');
  const headingElement = block.querySelector('.simple-card-heading');

  // Add image if available
  if (imageElement && imageSection) {
    if (imageElement.tagName === 'IMG') {
      const optimizedPic = createOptimizedPicture(imageElement.src, imageElement.alt, false, [{ width: '400' }]);
      imageSection.append(optimizedPic);
    } else {
      imageSection.append(imageElement.cloneNode(true));
    }
  } else if (imageSection) {
    // Remove image section if no image
    imageSection.remove();
  }

  // Add heading text if available
  if (headingText && headingElement) {
    headingElement.textContent = headingText;
  } else if (headingElement && !headingText) {
    // Remove heading if no text
    headingElement.parentElement.remove();
  }
}
