/* global WebImporter */
export default function parse(element, { document }) {
  // Build table header row exactly as specified
  const headerRow = ['Accordion (accordion84)'];
  const rows = [headerRow];
  // The accordion items are in an <ol> list
  const list = element.querySelector(':scope > ol.cubre-m-collapse');
  if (list) {
    // For each <li> (accordion item)
    list.querySelectorAll(':scope > li.cubre-m-collapse__item').forEach((item) => {
      // Get the clickable title link (use its existing element for reference)
      const titleEl = item.querySelector(':scope > .cubre-m-collapse__title');
      // Get the content wrapper (use its existing element)
      const contentEl = item.querySelector(':scope > .cubre-m-collapse__content');
      // Both title and content are required; fallback to empty string if missing
      rows.push([
        titleEl ? titleEl : '',
        contentEl ? contentEl : ''
      ]);
    });
  }
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
