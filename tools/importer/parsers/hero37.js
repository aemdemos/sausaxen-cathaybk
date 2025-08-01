/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: exactly as required
  const headerRow = ['Hero (hero37)'];

  // --- Background image (row 2) ---
  // The background image is the first <img> in .cubre-m-kv__bg with -pc class if possible
  let bgImg = null;
  const bgDiv = element.querySelector('.cubre-m-kv__bg');
  if (bgDiv) {
    bgImg = bgDiv.querySelector('img.cubre-m-kv__img.-pc') || bgDiv.querySelector('img');
  }

  // --- Title and subtitle (row 3) ---
  const wrapDiv = element.querySelector('.cubre-m-kv__wrap');
  const contentElements = [];
  if (wrapDiv) {
    // Title
    const titleDiv = wrapDiv.querySelector('.cubre-m-kv__title');
    if (titleDiv) {
      const p = titleDiv.querySelector('p');
      if (p) {
        contentElements.push(p);
      }
    }
    // Subtitle
    const subtitleDiv = wrapDiv.querySelector('.cubre-m-kv__subTitle');
    if (subtitleDiv) {
      const p = subtitleDiv.querySelector('p');
      if (p) {
        contentElements.push(p);
      }
    }
  }

  // Ensure at least an empty string is added if nothing found, so table shape is preserved
  const imageCell = bgImg ? bgImg : '';
  const textCell = contentElements.length > 0 ? contentElements : '';

  // Compose block table
  const cells = [
    headerRow,
    [imageCell],
    [textCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
