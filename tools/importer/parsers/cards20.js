/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block definition
  const headerRow = ['Cards (cards20)'];
  const rows = [headerRow];

  // Select all card elements
  const cardItems = element.querySelectorAll('.cubre-o-table__item.currency');
  cardItems.forEach(item => {
    // Column 1: Image (mandatory)
    let imageCell = '';
    const img = item.querySelector('.cubre-m-currency__img img');
    if (img) imageCell = img;

    // Column 2: Content (title, table, cta)
    const contentParts = [];
    // Title
    const titleDiv = item.querySelector('.cubre-m-currency__name');
    if (titleDiv) {
      // Use strong for the title as in the example (heading style is optional)
      const titleElem = document.createElement('strong');
      titleElem.textContent = titleDiv.textContent.trim();
      contentParts.push(titleElem);
    }
    // Currency rates table (reference, not clone)
    const rateTable = item.querySelector('.cubre-m-rateTable');
    if (rateTable) contentParts.push(rateTable);
    // CTA link (歷史走勢)
    const ctaLink = item.querySelector('.cubre-m-currency__action a');
    if (ctaLink) {
      // Only show the text of the link
      const link = document.createElement('a');
      // Use href if present (should NOT be '#'), otherwise try to build a semantic anchor
      const historyText = ctaLink.querySelector('.cubre-a-iconLink__text');
      link.textContent = historyText ? historyText.textContent.trim() : ctaLink.textContent.trim();
      if (ctaLink.hasAttribute('href') && ctaLink.getAttribute('href') !== '#') {
        link.href = ctaLink.getAttribute('href');
      } else if (ctaLink.hasAttribute('onclick')) {
        const onClick = ctaLink.getAttribute('onclick');
        // try to extract getHistory('XXX') currency code
        const match = onClick && onClick.match(/getHistory\(['"]([A-Z]+)['"]\)/);
        if (match && match[1]) {
          link.href = `#history-${match[1].toLowerCase()}`;
        } else {
          link.href = '#';
        }
      } else {
        link.href = '#';
      }
      contentParts.push(link);
    }
    // Compose the cell (with only existing elements)
    rows.push([imageCell, contentParts]);
  });

  // Build table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
