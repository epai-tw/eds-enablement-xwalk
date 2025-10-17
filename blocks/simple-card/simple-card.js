import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Store the original HTML for display
  const originalHTML = block.innerHTML;
  
  // Get the authored content (all rows contain image and heading)
  const rows = [...block.children];
  let imageElement = null;
  let headingText = '';

  // Extract image and heading from authored rows
  rows.forEach((row) => {
    const picture = row.querySelector('picture');
    const img = row.querySelector('img');
    
    if (picture || img) {
      imageElement = picture || img;
    } else if (row.textContent.trim()) {
      // Extract text from rows that don't contain images
      headingText = row.textContent.trim();
    }
  });

  // Use static HTML template with original HTML display
  block.innerHTML = `
    <div class="original-html-display">
      <h4>Original Block HTML:</h4>
      <pre><code>${originalHTML.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
    </div>
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
