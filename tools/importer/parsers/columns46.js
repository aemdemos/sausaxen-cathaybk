/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must be a single cell (one column)
  const headerRow = ['Columns (columns46)'];
  // Get all direct child <a> elements (table columns)
  const columns = Array.from(element.querySelectorAll(':scope > a'));
  // The cells for the columns row: each <a> as a cell
  const columnsRow = columns;
  // Assemble table: header, then content row
  const tableArray = [headerRow, columnsRow];
  // Create the table block
  const table = WebImporter.DOMUtils.createTable(tableArray, document);
  // Replace the original element
  element.replaceWith(table);
}
