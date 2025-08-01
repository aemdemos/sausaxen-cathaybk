/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name exactly as specified
  const headerRow = ['Columns (columns57)'];

  // Extract product image cell
  const productPic = element.querySelector('.cubre-m-product__pic');
  // Defensive: if not found, use empty span
  const leftCell = productPic || document.createElement('span');

  // Extract product content cell (title, list, and buttons)
  const productContent = element.querySelector('.cubre-m-product__content');
  // Defensive: if not found, use empty span
  const rightCell = productContent || document.createElement('span');

  // Build the columns row - maintain 2 columns as in the screenshot
  const contentRow = [leftCell, rightCell];

  // Compose table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
