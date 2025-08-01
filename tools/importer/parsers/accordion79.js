/* global WebImporter */
export default function parse(element, { document }) {
  // Compose header row
  const headerRow = ['Accordion (accordion79)'];
  const rows = [headerRow];

  // Select all accordion items
  const items = element.querySelectorAll('li.cubre-m-collapse__item');
  items.forEach((item) => {
    // Title is always the anchor element
    const titleEl = item.querySelector('.cubre-m-collapse__title');

    // Content: direct .cubre-m-collapse__content div
    const contentEl = item.querySelector('.cubre-m-collapse__content');
    let contentCell;
    if (contentEl) {
      // If single child, use that child; else, use all children in a fragment
      if (contentEl.children.length === 1) {
        contentCell = contentEl.children[0];
      } else {
        // If multiple children or mix of nodes/text, collect all
        const fragment = document.createDocumentFragment();
        Array.from(contentEl.childNodes).forEach((node) => fragment.appendChild(node));
        contentCell = fragment;
      }
    } else {
      contentCell = '';
    }
    rows.push([titleEl, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
