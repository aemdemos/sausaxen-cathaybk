/* global WebImporter */
export default function parse(element, { document }) {
  // Header row - must match example exactly
  const rows = [['Carousel (carousel13)']];

  // Get all carousel slide elements
  const slides = Array.from(element.querySelectorAll(':scope > .cubre-m-pictureStep__item'));

  slides.forEach((slide) => {
    // First cell: image (if present)
    let img = '';
    const picDiv = slide.querySelector('.cubre-m-pictureStep__pic');
    if (picDiv) {
      const foundImg = picDiv.querySelector('img');
      if (foundImg) img = foundImg;
    }

    // Second cell: all text-related content, in order
    let textCell = [];
    // Iterate all direct children (to preserve order)
    Array.from(slide.children).forEach((child) => {
      if (child.classList.contains('cubre-m-pictureStep__pic')) return; // skip image cell (already handled)

      // Title: promote <p> to <h2>
      if (child.classList.contains('cubre-m-pictureStep__title')) {
        const p = child.querySelector('p');
        if (p && p.textContent.trim().length > 0) {
          const h2 = document.createElement('h2');
          h2.textContent = p.textContent.trim();
          textCell.push(h2);
        }
      }
      // Description: wrap text in paragraph
      else if (child.classList.contains('cubre-m-pictureStep__text')) {
        if (child.textContent.trim().length > 0) {
          const p = document.createElement('p');
          p.textContent = child.textContent.trim();
          textCell.push(p);
        }
      }
      // Note: include as-is to preserve line breaks and formatting
      else if (child.classList.contains('cubre-m-pictureStep__note')) {
        textCell.push(child);
      }
      // Any other content: if not empty, wrap in paragraph
      else if (child.textContent.trim().length > 0) {
        const p = document.createElement('p');
        p.textContent = child.textContent.trim();
        textCell.push(p);
      }
    });
    // If nothing was found, use empty string for cell
    if (textCell.length === 0) textCell = '';
    else if (textCell.length === 1) textCell = textCell[0];

    rows.push([img, textCell]);
  });

  // Build the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
