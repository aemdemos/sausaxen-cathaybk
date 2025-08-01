/* global WebImporter */
export default function parse(element, { document }) {
  // Header row, matches spec exactly
  const headerRow = ['Accordion (accordion19)'];

  // Find all accordion items (li)
  const ol = element.querySelector('ol.cubre-m-collapse');
  if (!ol) {
    // No accordion found, remove the element
    element.replaceWith(document.createComment('No accordion found'));
    return;
  }
  const items = ol.querySelectorAll(':scope > li.cubre-m-collapse__item');
  const rows = [];

  items.forEach((item) => {
    // Title: clickable a tag (reference element)
    const title = item.querySelector('.cubre-m-collapse__title');
    // Defensive: if missing, skip this row
    if (!title) return;
    // Content: collapse content block
    const contentContainer = item.querySelector('.cubre-m-collapse__content');
    let contentEl = null;
    if (contentContainer) {
      const textItem = contentContainer.querySelector('.cubre-o-textContent__item');
      if (textItem) {
        contentEl = textItem;
      } else {
        // fallback: use all content children in contentContainer
        contentEl = document.createElement('div');
        Array.from(contentContainer.childNodes).forEach(child => contentEl.appendChild(child));
      }
    } else {
      // fallback so table never has empty cells
      contentEl = document.createTextNode('');
    }
    rows.push([title, contentEl]);
  });

  // Compose the table: header + item rows
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
