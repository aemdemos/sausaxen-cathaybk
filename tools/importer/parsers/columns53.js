/* global WebImporter */
export default function parse(element, { document }) {
  // The block name header
  const headerRow = ['Columns (columns53)'];

  // Defensive: find the main product row container
  const product = element.querySelector('.cubre-m-product');
  if (!product) return;

  // Prepare first column: the illustration (image)
  let imgCell = '';
  const imgCol = product.querySelector('.cubre-m-product__pic');
  if (imgCol) {
    const img = imgCol.querySelector('img');
    if (img) imgCell = img;
  }

  // Prepare second column: all content (title, text, buttons) in a wrapper
  let contentCell = '';
  const contentCol = product.querySelector('.cubre-m-product__content');
  if (contentCol) {
    // We'll keep the order: title, text, buttons
    const frag = document.createElement('div');
    const title = contentCol.querySelector('.cubre-m-product__title');
    if (title) frag.appendChild(title);
    const text = contentCol.querySelector('.cubre-o-textContent');
    if (text) frag.appendChild(text);
    const btn = contentCol.querySelector('.cubre-m-product__btn');
    if (btn) frag.appendChild(btn);
    // Only use the wrapper if it has content
    if (frag.childNodes.length > 0) contentCell = frag;
  }

  // Only create the content row if at least one cell has content
  const contentRow = [imgCell, contentCell];

  // Final cells array is always a header row (single col), then content row (two cols)
  const cells = [
    headerRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
