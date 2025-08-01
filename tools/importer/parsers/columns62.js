/* global WebImporter */
export default function parse(element, { document }) {
  // Find the horizontal graphic container
  const horGraphic = element.querySelector('.cubre-m-horGraphic');
  if (!horGraphic) return;

  // Find left and right column containers
  const leftCol = horGraphic.querySelector('.cubre-m-horGraphic__content');
  const rightCol = horGraphic.querySelector('.cubre-m-horGraphic__pic');

  // Prepare left cell: grab the visible content (steps/title)
  let leftCell = '';
  if (leftCol) {
    leftCell = document.createElement('div');
    Array.from(leftCol.childNodes).forEach(node => {
      leftCell.appendChild(node);
    });
  }

  // Prepare right cell: image (should ONLY contain the img)
  let rightCell = '';
  if (rightCol) {
    const img = rightCol.querySelector('img');
    if (img) {
      rightCell = img;
    }
  }
  
  // Table header row must be a single cell exactly as in the example
  const headerRow = ['Columns (columns62)'];
  // Table content row with two columns
  const contentRow = [leftCell, rightCell];
  
  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
