/* global WebImporter */
export default function parse(element, { document }) {
  // Critical review requirements:
  // - Only one block table (Columns)
  // - Header row: 'Columns (columns67)'
  // - Second row: left is all text content, right is the image (not as a link)
  // - Reference existing elements, do not clone
  // - No markdown, only elements
  // - No Section Metadata block needed

  // Find the columns wrapper
  const wrap = element.querySelector('.cubre-m-horGraphic__wrap');
  if (!wrap) return;

  // Get the content/text (left column)
  const contentCol = wrap.querySelector('.cubre-m-horGraphic__content');
  // Get the image (right column)
  const imageCol = wrap.querySelector('.cubre-m-horGraphic__pic');

  // Defensive: Only proceed if at least one column exists
  if (!contentCol && !imageCol) return;
  const row = [];
  if (contentCol) row.push(contentCol); // reference, do not clone
  if (imageCol) row.push(imageCol);

  // Compose the block table
  const cells = [
    ['Columns (columns67)'], // Header
    row
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}