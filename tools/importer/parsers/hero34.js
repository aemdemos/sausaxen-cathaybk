/* global WebImporter */
export default function parse(element, { document }) {
  // Find all immediate img tags (background images)
  const imgs = element.querySelectorAll('img');
  // Prefer desktop image with '-pc' class
  let bgImg = null;
  imgs.forEach(img => {
    if (!bgImg && img.classList.contains('-pc')) {
      bgImg = img;
    }
  });
  // Fallback: if no '-pc', use first img
  if (!bgImg && imgs.length > 0) {
    bgImg = imgs[0];
  }

  // Construct the rows as per spec
  const headerRow = ['Hero (hero34)'];
  const bgRow = [bgImg ? bgImg : ''];
  // No heading/text/cta present in HTML, cell left empty
  const textRow = [''];

  const cells = [headerRow, bgRow, textRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
