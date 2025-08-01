/* global WebImporter */
export default function parse(element, { document }) {
  // Find the Cubre horizontal graphic block
  const horGraphic = element.querySelector('.cubre-m-horGraphic');
  if (!horGraphic) return;

  const wrap = horGraphic.querySelector('.cubre-m-horGraphic__wrap');
  if (!wrap) return;

  // Left column: illustration
  let illustration = '';
  const picDiv = wrap.querySelector('.cubre-m-horGraphic__pic');
  if (picDiv) {
    const img = picDiv.querySelector('img');
    if (img) illustration = img;
  }

  // Right column: text/list content
  let content = '';
  const contentDiv = wrap.querySelector('.cubre-m-horGraphic__content');
  if (contentDiv) {
    const textDiv = contentDiv.querySelector('.cubre-m-horGraphic__text');
    if (textDiv) content = textDiv;
  }

  // Determine the number of columns dynamically
  const columns = [illustration, content];
  // Header row must have the same number of columns as the data row
  const headerRow = ['Columns (columns71)'];
  while (headerRow.length < columns.length) headerRow.push('');

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columns
  ], document);

  element.replaceWith(table);
}
