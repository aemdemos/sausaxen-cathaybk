/* global WebImporter */
export default function parse(element, { document }) {
  // Get left (image) and right (list) columns
  const leftPic = element.querySelector('.cubre-m-horGraphic__pic');
  let rightContent = null;
  const contentCol = element.querySelector('.cubre-m-horGraphic__content');
  if (contentCol) {
    // Find the first ol inside, preferring deeper .cubre-o-textContent -sm > ol if available
    let ol = contentCol.querySelector('.cubre-o-textContent.-sm ol');
    if (!ol) {
      ol = contentCol.querySelector('ol');
    }
    if (ol) {
      rightContent = ol;
    } else {
      rightContent = contentCol;
    }
  }
  // Create table using WebImporter.DOMUtils.createTable
  // First row: single cell header (should span both columns visually)
  // Second row: left and right columns
  const cells = [];
  // Header row: single cell
  cells.push(['Columns (columns51)']);
  // Content row: two columns
  cells.push([leftPic, rightContent]);
  // Create table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Ensure the header cell spans both columns
  const headerRow = table.querySelector('tr:first-child');
  if (headerRow) {
    const th = headerRow.querySelector('th');
    if (th) {
      th.setAttribute('colspan', '2');
    }
  }
  // Replace the original element
  element.replaceWith(table);
}
