/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Extract tab labels from nav
  let tabLabels = [];
  const nav = element.querySelector('.cubre-m-horGraphicTab__nav');
  if (nav) {
    const wrapper = nav.querySelector('.swiper-wrapper');
    if (wrapper) {
      tabLabels = Array.from(wrapper.children).map(el => {
        const p = el.querySelector('p');
        return p ? p.textContent.trim() : el.textContent.trim();
      });
    }
  }
  // 2. Extract tab content blocks from container
  let tabContentDivs = [];
  const contentWrapper = element.querySelector('.cubre-m-horGraphicTab__container');
  if (contentWrapper) {
    tabContentDivs = Array.from(contentWrapper.querySelectorAll(':scope > .cubre-m-horGraphicTab__content'));
  } else {
    tabContentDivs = Array.from(element.querySelectorAll(':scope > .cubre-m-horGraphicTab__content'));
  }
  // Only pair matching tabs
  const numTabs = Math.min(tabLabels.length, tabContentDivs.length);
  const labels = tabLabels.slice(0, numTabs);
  const contents = tabContentDivs.slice(0, numTabs);

  // Compose table: header row, label row, N data rows (each: label, content)
  const headerRow = ['Tabs (tabs6)'];
  const tabLabelRow = labels;
  const dataRows = [];
  for (let i = 0; i < numTabs; i++) {
    dataRows.push([labels[i], contents[i]]);
  }
  const cells = [headerRow, tabLabelRow, ...dataRows];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
