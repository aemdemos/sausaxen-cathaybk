/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: check product wrapper
  const product = element.querySelector('.cubre-m-product');
  if (!product) return;

  // Get left column: main image
  const pic = product.querySelector('.cubre-m-product__pic');
  let leftCol = pic && pic.children.length ? pic : document.createElement('div');

  // Get right column: everything else (features, title, text, links, button)
  const content = product.querySelector('.cubre-m-product__content');
  let rightCol = content && content.children.length ? content : document.createElement('div');

  // The header row must have the same number of columns as the data/content row
  const headerRow = ['Columns (columns82)', '']; // Two columns in header
  const cellsRow = [leftCol, rightCol];

  // Compose the table and replace the element
  const table = WebImporter.DOMUtils.createTable([headerRow, cellsRow], document);
  element.replaceWith(table);
}
