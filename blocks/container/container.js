import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * Parse container configuration from block metadata
 * @param {Element} block - The container block element
 * @returns {Object} Configuration object
 */
function parseConfig(block) {
  const config = {
    variant: 1, // Default to split layout
    splitLayout: {
      desktop: { colSpan: '6:6' },
      tablet: { colSpan: '6:6' },
      mobile: { stacked: true },
      reverse: false
    },
    overlayLayout: {
      mainContentWidth: 2,
      desktop: { colSpan: '7:6' },
      tablet: { colSpan: '7:6' },
      mobile: { stacked: true },
      reverse: false
    },
    container1: {
      width: { mode: 'fluid' },
      alignment: 'left',
      margin: {},
      clip: false,
      allowedComponents: []
    },
    container2: {
      width: { mode: 'fluid' },
      alignment: 'left',
      margin: {},
      clip: false,
      allowedComponents: []
    },
    verticalAlignment: 'top'
  };

  // Parse variant from class names
  const classes = Array.from(block.classList);
  const variantClass = classes.find(c => c.startsWith('variant-'));
  if (variantClass) {
    config.variant = parseInt(variantClass.replace('variant-', ''), 10) || 1;
  }

  // Parse column span from class names
  const colSpanClass = classes.find(c => /^\d+:\d+$/.test(c));
  if (colSpanClass) {
    config.splitLayout.desktop.colSpan = colSpanClass;
  }

  // Parse reverse from class names
  if (classes.includes('reverse')) {
    config.splitLayout.reverse = true;
    config.overlayLayout.reverse = true;
  }

  // Parse vertical alignment
  if (classes.includes('align-center')) {
    config.verticalAlignment = 'center';
  } else if (classes.includes('align-bottom')) {
    config.verticalAlignment = 'bottom';
  }

  return config;
}

/**
 * Apply split layout (Variant 1)
 * @param {Element} block - The container block element
 * @param {Object} config - Configuration object
 */
function applySplitLayout(block, config) {
  const columns = Array.from(block.children);

  if (columns.length < 2) {
    console.warn('Split layout requires at least 2 columns');
    return;
  }

  const column1 = columns[0];
  const column2 = columns[1];

  // Create wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'container-wrapper split-layout';

  // Apply column span classes
  const [col1, col2] = config.splitLayout.desktop.colSpan.split(':');
  column1.className = `container-column column-1 col-span-${col1}`;
  column2.className = `container-column column-2 col-span-${col2}`;

  // Apply reverse if needed
  if (config.splitLayout.reverse) {
    wrapper.classList.add('reverse');
  }

  // Apply vertical alignment
  wrapper.setAttribute('data-vertical-align', config.verticalAlignment);

  // Move columns to wrapper
  moveInstrumentation(block, wrapper);
  wrapper.appendChild(column1);
  wrapper.appendChild(column2);

  // Clear block and append wrapper
  block.textContent = '';
  block.appendChild(wrapper);
}

/**
 * Apply overlay layout (Variants 2-5)
 * @param {Element} block - The container block element
 * @param {Object} config - Configuration object
 */
function applyOverlayLayout(block, config) {
  const columns = Array.from(block.children);

  if (columns.length < 2) {
    console.warn('Overlay layout requires at least 2 columns');
    return;
  }

  const background = columns[0];
  const foreground = columns[1];

  // Create wrapper
  const wrapper = document.createElement('div');
  wrapper.className = `container-wrapper overlay-layout variant-${config.variant}`;

  // Setup background column (Column 1)
  background.className = 'container-column column-background';

  // Setup foreground column (Column 2)
  foreground.className = `container-column column-foreground width-${config.overlayLayout.mainContentWidth}`;

  // Apply column span for overlay positioning
  const [col1, col2] = config.overlayLayout.desktop.colSpan.split(':');
  wrapper.setAttribute('data-col-span', `${col1}:${col2}`);

  // Apply reverse if needed
  if (config.overlayLayout.reverse) {
    wrapper.classList.add('reverse');
  }

  // Apply vertical alignment
  wrapper.setAttribute('data-vertical-align', config.verticalAlignment);

  // Move columns to wrapper
  moveInstrumentation(block, wrapper);
  wrapper.appendChild(background);
  wrapper.appendChild(foreground);

  // Clear block and append wrapper
  block.textContent = '';
  block.appendChild(wrapper);
}

/**
 * Apply column settings (width, alignment, margins, etc.)
 * @param {Element} column - Column element
 * @param {Object} settings - Column settings
 */
function applyColumnSettings(column, settings) {
  // Width mode
  if (settings.width.mode === 'fixed' && settings.width.fixedWidth) {
    column.style.width = settings.width.fixedWidth;
    column.classList.add('width-fixed');
  } else if (settings.width.maxWidth) {
    column.style.maxWidth = settings.width.maxWidth;
  }

  // Alignment
  if (settings.alignment) {
    column.classList.add(`align-${settings.alignment}`);
  }

  // Margins
  if (settings.margin.top) {
    column.style.marginTop = settings.margin.top;
  }
  if (settings.margin.left) {
    column.style.marginLeft = settings.margin.left;
  }
  if (settings.margin.right) {
    column.style.marginRight = settings.margin.right;
  }

  // Background color
  if (settings.bgColor) {
    column.style.backgroundColor = settings.bgColor;
  }

  // Clipping
  if (settings.clip) {
    column.style.overflow = 'hidden';
  }
}

/**
 * Decorate the container block
 * @param {Element} block - The container block element
 */
export default function decorate(block) {
  // Parse configuration
  const config = parseConfig(block);

  // Apply layout based on variant
  if (config.variant === 1) {
    applySplitLayout(block, config);
  } else {
    applyOverlayLayout(block, config);
  }

  // Apply column settings
  const columns = block.querySelectorAll('.container-column');
  if (columns[0]) {
    applyColumnSettings(columns[0], config.container1);
  }
  if (columns[1]) {
    applyColumnSettings(columns[1], config.container2);
  }
}
