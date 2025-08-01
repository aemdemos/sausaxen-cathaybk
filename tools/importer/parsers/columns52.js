/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matching the example (single column)
  const headerRow = ['Columns (columns52)'];

  // Find the title and the main content box
  const titleDiv = element.querySelector('.cubre-o-formRow__title');
  const contentDiv = element.querySelector('.cubre-o-formRow__content');

  // We want all visible text from the source: title + the radio options
  // Reference the actual existing elements (no clones!)
  let cellContent = [];
  if (titleDiv) cellContent.push(titleDiv);
  if (contentDiv) cellContent.push(contentDiv);
  // If both are missing, fallback to all child nodes
  if (cellContent.length === 0) {
    cellContent = Array.from(element.childNodes);
  }

  // Build table for columns block
  const cells = [
    headerRow,
    [cellContent]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
