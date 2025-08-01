/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .cubre-m-horGraphic block
  const horGraphic = element.querySelector('.cubre-m-horGraphic');
  if (!horGraphic) return;

  // LEFT COLUMN: image and content
  const leftColParts = [];
  // Main image
  const picWrap = horGraphic.querySelector('.cubre-m-horGraphic__pic');
  if (picWrap) {
    const picImg = picWrap.querySelector('img');
    if (picImg) leftColParts.push(picImg);
  }
  // Content: List
  const contentWrap = horGraphic.querySelector('.cubre-m-horGraphic__content');
  if (contentWrap) {
    // Only include content if not empty
    Array.from(contentWrap.children).forEach((child) => {
      // Only append if not empty
      if (child && child.textContent && child.textContent.trim()) {
        leftColParts.push(child);
      }
    });
  }

  // RIGHT COLUMN: background image (desktop)
  let rightImg = horGraphic.querySelector('.cubre-m-horGraphic__bg img.-pc');
  if (!rightImg) {
    // Fallback to any bg image if desktop not found
    rightImg = horGraphic.querySelector('.cubre-m-horGraphic__bg img');
  }

  // Compose cells array
  const cells = [
    ['Columns (columns7)'],
    [leftColParts.length > 1 ? leftColParts : (leftColParts[0] || ''), rightImg || '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
