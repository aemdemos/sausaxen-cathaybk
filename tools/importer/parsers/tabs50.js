/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row for the block
  const headerRow = ['Tabs (tabs50)'];
  
  // 1. Extract tab labels
  // These are the p elements inside the tab nav buttons
  const tabLabelElements = Array.from(element.querySelectorAll('.cubre-m-horGraphicTab__nav .cubre-m-horGraphicTab__btn > p'));
  const tabLabels = tabLabelElements.map(el => el.textContent.trim());

  // 2. Extract tab content containers
  // One per tab, order matches nav/tab order
  const tabContentElements = Array.from(element.querySelectorAll('.cubre-m-horGraphicTab__container > .cubre-m-horGraphicTab__content'));

  // 3. Compose the table rows
  const rows = [headerRow];
  for (let i = 0; i < tabLabels.length; i++) {
    const label = tabLabels[i];
    // Defensive: If a tab is missing content, put an empty div
    const content = tabContentElements[i] || document.createElement('div');
    rows.push([label, content]);
  }

  // 4. Create and replace with the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
