/* global WebImporter */
export default function parse(element, { document }) {
  // Find left column: product pic
  let leftCol = null;
  // Find right column: full content (including button)
  let rightColContent = [];

  const product = element.querySelector('.cubre-m-product');
  if (product) {
    leftCol = product.querySelector('.cubre-m-product__pic');
    const content = product.querySelector('.cubre-m-product__content');
    if (content) rightColContent.push(content);
  }

  // Also append .cubre-m-product__btn to right col, if present
  const btn = element.querySelector('.cubre-m-product__btn');
  if (btn) rightColContent.push(btn);

  // Fallbacks: if leftCol or rightColContent missing
  if (!leftCol) {
    // Try to find any image as leftCol
    leftCol = element.querySelector('img');
  }
  if (rightColContent.length === 0) {
    // Anything left that's not the image
    const possible = Array.from(element.children).filter(e => !e.contains(leftCol));
    rightColContent = possible;
  }

  // Flatten rightColContent if it's still only one element
  let rightCol = rightColContent.length === 1 ? rightColContent[0] : rightColContent;

  // Create table rows to match the required structure:
  // Single header cell spanning columns, then a single row with 2 columns
  const cells = [
    ['Columns (columns83)'],
    [leftCol, rightCol]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
