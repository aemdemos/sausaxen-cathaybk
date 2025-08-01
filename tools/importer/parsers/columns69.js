/* global WebImporter */
export default function parse(element, { document }) {
  // Gather all immediate cube items (columns)
  const items = Array.from(element.querySelectorAll(':scope > .cubre-m-cube__item'));
  if (!items.length) return;

  // Construct a cell for each item
  const contentRow = items.map(item => {
    const fragment = document.createElement('div');
    const icon = item.querySelector(':scope > .cubre-m-cube__icon');
    if (icon) fragment.appendChild(icon);
    const title = item.querySelector(':scope > .cubre-m-cube__title');
    if (title) fragment.appendChild(title);
    const text = item.querySelector(':scope > .cubre-m-cube__text');
    if (text) fragment.appendChild(text);
    return fragment;
  });

  // The header row must contain exactly one cell
  const headerRow = ['Columns (columns69)'];

  // Table: header (1 cell), then content (N cells)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
