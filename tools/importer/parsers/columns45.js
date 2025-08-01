/* global WebImporter */
export default function parse(element, { document }) {
  // Find the image column (left)
  const leftPicDiv = element.querySelector('.cubre-m-horGraphic__pic');
  let leftContent = null;
  if (leftPicDiv) {
    // We want just the image, not the wrapping div
    const img = leftPicDiv.querySelector('img');
    leftContent = img ? img : leftPicDiv;
  }

  // Find the right content (text side)
  const rightContentDiv = element.querySelector('.cubre-m-horGraphic__content');
  let rightContent = null;
  if (rightContentDiv) {
    // Try to extract the text block. If none, reference the container
    const textBlock = rightContentDiv.querySelector('.cubre-m-horGraphic__text');
    if (textBlock && textBlock.textContent.trim().length > 0) {
      rightContent = textBlock;
    } else {
      rightContent = rightContentDiv;
    }
  }

  // Prepare columns array, ensuring two columns as shown visually
  const columnsRow = [leftContent, rightContent];

  // Block name header row
  const headerRow = ['Columns (columns45)'];

  // Compose table structure
  const cells = [headerRow, columnsRow];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
