/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per block spec
  const headerRow = ['Cards (cards21)'];
  const rows = [headerRow];

  // Find all cards in the slider
  const cardItems = element.querySelectorAll('.cubre-o-card__item');

  cardItems.forEach((item) => {
    // Image: always in .cubre-m-card__pic > img
    const img = item.querySelector('.cubre-m-card__pic img');

    // Title: .cubre-m-card__title
    const titleEl = item.querySelector('.cubre-m-card__title');
    let titleElem = null;
    if (titleEl && titleEl.textContent.trim()) {
      titleElem = document.createElement('strong');
      titleElem.textContent = titleEl.textContent.trim();
    }

    // Description: .cubre-m-card__text (may be missing or empty)
    const descEl = item.querySelector('.cubre-m-card__text');
    // We want all of descEl's child nodes (elements and text)
    let descNodes = [];
    if (descEl) {
      descNodes = Array.from(descEl.childNodes).filter(n => {
        // Eliminate empty text nodes
        return n.nodeType !== Node.TEXT_NODE || n.textContent.trim().length > 0;
      });
    }
    // Build the second cell (textual content)
    const textContents = [];
    if (titleElem) textContents.push(titleElem);
    if (descNodes.length) textContents.push(...descNodes);
    // Defensive: if no title or desc, just leave empty
    rows.push([
      img || '',
      textContents.length ? textContents : ''
    ]);
  });

  // Create the table and replace the block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
