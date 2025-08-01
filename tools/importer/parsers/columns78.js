/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Columns block
  const headerRow = ['Columns (columns78)'];

  // Find the main .cubre-m-horGraphic section
  const horGraphic = element.querySelector('.cubre-m-horGraphic');
  if (!horGraphic) return;

  // --- LEFT COLUMN: single illustration image only ---
  let leftColContent = [];
  const picWrap = horGraphic.querySelector('.cubre-m-horGraphic__pic');
  if (picWrap) {
    // Illustration: get the FIRST <img> in .cubre-m-horGraphic__pic
    const img = picWrap.querySelector('img');
    if (img) leftColContent.push(img);
  }
  // If illustration image is missing, use empty string to maintain structure
  if (leftColContent.length === 0) leftColContent = [''];

  // --- RIGHT COLUMN: title, text, steps, detail button, main button ---
  let rightColContent = [];
  const contentWrap = horGraphic.querySelector('.cubre-m-horGraphic__content');

  if (contentWrap) {
    // Title (div with class cubre-m-horGraphic__title)
    const title = contentWrap.querySelector('.cubre-m-horGraphic__title');
    if (title) rightColContent.push(title);
    // Main text (div with class cubre-o-textContent)
    const textContent = contentWrap.querySelector('.cubre-o-textContent');
    if (textContent) rightColContent.push(textContent);
    // Steps (ol.cubre-m-insideStep)
    const steps = contentWrap.querySelector('ol.cubre-m-insideStep');
    if (steps) rightColContent.push(steps);
    // Detail button (a.cubre-a-iconLink)
    const detailBtn = contentWrap.querySelector('a.cubre-a-iconLink');
    if (detailBtn) rightColContent.push(detailBtn);
  }

  // Main external button (outside contentWrap but inside .cubre-m-horGraphic__btn)
  const btnSection = horGraphic.querySelector('.cubre-m-horGraphic__btn');
  if (btnSection) {
    const btn = btnSection.querySelector('a');
    if (btn) rightColContent.push(btn);
  }

  // If rightColContent is empty, add an empty string to keep two columns
  if (rightColContent.length === 0) rightColContent = [''];

  // Compose table rows: header, then two columns (left: illustration, right: content)
  const cells = [
    headerRow,
    [leftColContent, rightColContent]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
