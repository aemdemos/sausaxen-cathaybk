/* global WebImporter */
export default function parse(element, { document }) {
  // Get left column: product image
  const leftPic = element.querySelector('.cubre-m-product__pic');
  // Get right column: product content and button
  const content = element.querySelector('.cubre-m-product__content');
  const btnDiv = element.querySelector('.cubre-m-product__btn');

  // Compose left cell (image only, reference the whole '.cubre-m-product__pic' div)
  let leftCell = leftPic ? leftPic : document.createElement('div');

  // Compose right cell (all content except the image, and the button)
  const rightCell = document.createElement('div');
  if (content) {
    rightCell.appendChild(content);
  }
  if (btnDiv) {
    rightCell.appendChild(btnDiv);
  }

  // The header row must have two columns: ['Columns (columns17)', '']
  const headerRow = ['Columns (columns17)', ''];
  const row = [leftCell, rightCell];
  const cells = [headerRow, row];

  // Create the table and replace the element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
