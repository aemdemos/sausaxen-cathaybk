/* global WebImporter */
export default function parse(element, { document }) {
  // Get all columns: each .cubre-o-iconEssay__item is a column
  const items = Array.from(element.querySelectorAll('.cubre-o-iconEssay__item'));

  // The header row must be a single cell array (one column)
  const headerRow = ['Columns (columns23)'];

  // The second row contains all the columns as separate cells in the row
  const contentRow = items;

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
