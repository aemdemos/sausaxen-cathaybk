/* global WebImporter */
export default function parse(element, { document }) {
  // Find the table block root
  const tableBlock = element.querySelector('.cubre-m-scrollTable');
  if (!tableBlock) return;

  // Find the best table to use (prefer the body table for actual data)
  let tableEl = null;
  const tableBodyDiv = tableBlock.querySelector('.cubre-m-scrollTable__body');
  if (tableBodyDiv) {
    tableEl = tableBodyDiv.querySelector('table');
  }
  // Fallback: head table if body isn't found (robustness)
  if (!tableEl) {
    const tableHeadDiv = tableBlock.querySelector('.cubre-m-scrollTable__head');
    if (tableHeadDiv) {
      tableEl = tableHeadDiv.querySelector('table');
    }
  }
  if (!tableEl) return;

  // Build a 2D array representing rows and columns, extracting text from each cell
  const rows = Array.from(tableEl.rows);
  const tableRows = rows.map(row => {
    return Array.from(row.cells).map(cell => {
      // Extract visible text content (trimmed)
      return cell.textContent.trim();
    });
  });

  // Create the inner data table
  const dataTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Compose the outer block: Header, then the data table in a single cell
  const blockCells = [
    ['Table (striped, tableStriped32)'],
    [dataTable]
  ];
  const block = WebImporter.DOMUtils.createTable(blockCells, document);
  element.replaceWith(block);
}
