/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Table (no header)'];
  const rows = [headerRow];

  // Find all block items (one per product/rate table)
  const items = element.querySelectorAll(':scope > .cubre-o-table > .cubre-o-table__item');
  items.forEach((item) => {
    // Product name (if present)
    const nameEl = item.querySelector('.cubre-o-rateCard__head .cubre-a-rateName__ch');
    // The table content
    const table = item.querySelector('.cubre-o-rateCard__content table.cubre-m-rateTable');
    // Only add if there's actual content
    if (nameEl || table) {
      const wrapper = document.createElement('div');
      if (nameEl) {
        // Use a <p> for the block/product name
        const titleP = document.createElement('p');
        titleP.textContent = nameEl.textContent.trim();
        wrapper.appendChild(titleP);
      }
      if (table) {
        wrapper.appendChild(table);
      }
      rows.push([wrapper]);
    }
  });

  // If there were no items, check for fallback (e.g., if the structure changes)
  if (rows.length === 1) {
    // Check for a single rate card in the element
    const nameEl = element.querySelector('.cubre-o-rateCard__head .cubre-a-rateName__ch');
    const table = element.querySelector('.cubre-o-rateCard__content table.cubre-m-rateTable');
    if (nameEl || table) {
      const wrapper = document.createElement('div');
      if (nameEl) {
        const titleP = document.createElement('p');
        titleP.textContent = nameEl.textContent.trim();
        wrapper.appendChild(titleP);
      }
      if (table) {
        wrapper.appendChild(table);
      }
      rows.push([wrapper]);
    }
  }

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
