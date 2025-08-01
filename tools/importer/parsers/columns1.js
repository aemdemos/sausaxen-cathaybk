/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children of .cubre-o-graphic__item (columns)
  const items = element.querySelectorAll('.cubre-o-graphic__item');
  const columns = [];
  items.forEach((item) => {
    columns.push(item);
  });

  // The header row should be a single cell (one column)
  const headerRow = ['Columns (columns1)'];
  // The second row should have one cell for each column
  const cellsRow = [...columns];

  // Now wrap into a table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cellsRow
  ], document);

  element.replaceWith(table);
}
