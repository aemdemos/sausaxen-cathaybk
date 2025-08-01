/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards40) block header, exactly matching the example
  const headerRow = ['Cards (cards40)'];

  // Find all card items in the swiper wrapper
  const swiperWrapper = element.querySelector('.swiper-wrapper');
  if (!swiperWrapper) return;
  const cardItems = swiperWrapper.querySelectorAll('.cubre-o-card__item');
  if (!cardItems.length) return;

  // Build rows for the block table
  const rows = [headerRow];
  cardItems.forEach((cardItem) => {
    // Find card main section
    const cardMain = cardItem.querySelector('.cubre-m-card__main');
    if (!cardMain) return;

    // First cell: image (reference existing element)
    let imgEl = null;
    const picDiv = cardMain.querySelector('.cubre-m-card__pic');
    if (picDiv) {
      imgEl = picDiv.querySelector('img');
    }

    // Second cell: text area
    const contentDiv = cardMain.querySelector('.cubre-m-card__content');
    const cellContent = [];
    if (contentDiv) {
      // Title (if present)
      const titleDiv = contentDiv.querySelector('.cubre-m-card__title');
      if (titleDiv) {
        // Use <strong> for bold, preserve semantic intent
        const strong = document.createElement('strong');
        strong.textContent = titleDiv.textContent.trim();
        cellContent.push(strong);
      }
      // Description (if present)
      const descDiv = contentDiv.querySelector('.cubre-m-card__text');
      if (descDiv) {
        // If there's already something in cellContent, add a <br>
        if (cellContent.length > 0) {
          cellContent.push(document.createElement('br'));
        }
        // Add all children of the description div in order
        Array.from(descDiv.childNodes).forEach((node) => {
          // Reference original DOM nodes in the document
          cellContent.push(node);
        });
      }
    }
    // CTA button (if present)
    const btnDiv = cardMain.querySelector('.cubre-m-card__btn');
    if (btnDiv) {
      const link = btnDiv.querySelector('a');
      if (link) {
        if (cellContent.length > 0) {
          cellContent.push(document.createElement('br'));
        }
        cellContent.push(link);
      }
    }

    rows.push([
      imgEl || '',
      cellContent.length > 0 ? cellContent : ''
    ]);
  });

  // Create and replace with the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
