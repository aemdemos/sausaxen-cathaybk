/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Tabs (tabs72)'];

  // Get the tab labels, which are the <a> inside the .cubre-m-horGraphicTab__nav .swiper-wrapper
  const nav = element.querySelector('.cubre-m-horGraphicTab__nav .swiper-wrapper');
  const tabBtnLinks = Array.from(nav ? nav.querySelectorAll(':scope > a') : []);
  const tabLabels = tabBtnLinks.map((a) => {
    // Use <p> if present, otherwise fallback to the textContent
    const p = a.querySelector('p');
    return p ? p.textContent.trim() : a.textContent.trim();
  });

  // Get all tab content containers in order
  const tabContents = Array.from(element.querySelectorAll('.cubre-m-horGraphicTab__container > .cubre-m-horGraphicTab__content'));

  // Make cells: first row is header, following rows per tab [label, content]
  const cells = [headerRow];
  const count = Math.min(tabLabels.length, tabContents.length);
  for (let i = 0; i < count; i++) {
    const label = tabLabels[i];
    const contentElem = tabContents[i];
    // For tab content: keep the main content block ('.cubre-m-horGraphic'), but if not found, fallback to the content container
    let contentToUse = contentElem.querySelector('.cubre-m-horGraphic');
    if (!contentToUse) contentToUse = contentElem;
    // Only use reference to existing element
    cells.push([
      label,
      contentToUse
    ]);
  }

  // Create table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
