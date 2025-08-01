/* global WebImporter */
export default function parse(element, { document }) {
  // Table header for the block, must match example exactly
  const headerRow = ['Cards (cards48)'];

  // Find all the card items in the section
  const items = element.querySelectorAll('.cubre-o-iconEssay__item');

  // Collect 2-column row for each card
  const rows = Array.from(items).map(item => {
    // First column: image/icon (only the <img> element itself)
    let iconImg = null;
    const iconDiv = item.querySelector('.cubre-m-iconEssay__icon');
    if (iconDiv) {
      iconImg = iconDiv.querySelector('img');
    }
    // Second column: all text (title, description, CTA), preserve line breaks
    const textCell = document.createElement('div');

    // Title (strong)
    const title = item.querySelector('.cubre-m-iconEssay__title');
    if (title && title.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      textCell.appendChild(strong);
      textCell.appendChild(document.createElement('br'));
    }
    // Description
    const desc = item.querySelector('.cubre-m-iconEssay__desc .cubre-o-textContent');
    if (desc && desc.textContent.trim()) {
      const descDiv = document.createElement('div');
      descDiv.textContent = desc.textContent.trim();
      textCell.appendChild(descDiv);
    }
    // CTA link (if present)
    const ctaLink = item.querySelector('.cubre-m-iconEssay__link a');
    if (ctaLink && ctaLink.textContent.trim()) {
      const ctaDiv = document.createElement('div');
      // Use the original <a> element (not cloned)
      ctaDiv.appendChild(ctaLink);
      textCell.appendChild(ctaDiv);
    }
    return [iconImg, textCell];
  });

  // Compose the full table array
  const cells = [headerRow, ...rows];

  // Create the block table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
