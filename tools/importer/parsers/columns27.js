/* global WebImporter */
export default function parse(element, { document }) {
  // The header row should always be a single cell with the correct text
  const headerRow = ['Columns (columns27)'];

  // Get all immediate columns from the flipBox
  const flipWrap = element.querySelector('.cubre-m-flipBox__wrap');
  if (!flipWrap) return;
  const items = Array.from(flipWrap.querySelectorAll(':scope > .cubre-m-flipBox__item'));
  if (items.length === 0) return;

  // The second row: each .cubre-m-flipBox__item is a single column in the row
  const secondRow = items;

  // Build the final structure
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
