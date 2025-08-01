/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion (accordion22)'];
  const rows = [headerRow];
  // Locate the main <ol> that contains accordion items
  const mainList = element.querySelector('ol.cubre-m-collapse');
  if (!mainList) return;
  // For each accordion item (direct <li> children)
  mainList.querySelectorAll(':scope > li.cubre-m-collapse__item').forEach((li) => {
    // Get the title (the first direct <a> child)
    const titleAnchor = li.querySelector(':scope > a.cubre-m-collapse__title');
    // If no title, skip this accordion item
    if (!titleAnchor) return;
    // Get the content (the first direct <div> child with content)
    const contentDiv = li.querySelector(':scope > div.cubre-m-collapse__content');
    // Defensive: If no content, use an empty div
    const contentCell = contentDiv || document.createElement('div');
    rows.push([titleAnchor, contentCell]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
