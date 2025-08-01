/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Correct header row: one column only
  const headerRow = ['Tabs (tabs77)'];

  // 2. Find the content container for the tabs
  const tabContent = element.querySelector('.cubre-m-tab__content');
  if (!tabContent) return;

  // 3. Find the tabs wrapper
  const pictureStep = tabContent.querySelector('.cubre-m-pictureStep');
  if (!pictureStep) return;

  // 4. Find all tab items
  const tabItems = pictureStep.querySelectorAll('.cubre-m-pictureStep__item');
  if (!tabItems.length) return;

  // 5. For each tab item, extract the label and content
  const rows = Array.from(tabItems).map((item) => {
    // Tab label: in .cubre-m-pictureStep__title (may contain a <p>)
    let labelElem = item.querySelector('.cubre-m-pictureStep__title');
    let label = '';
    if (labelElem) {
      const p = labelElem.querySelector('p');
      label = p ? p.textContent.trim() : labelElem.textContent.trim();
    }
    // Tab content: image and text
    const imgEl = item.querySelector('.cubre-m-pictureStep__pic img');
    const textEl = item.querySelector('.cubre-m-pictureStep__text');
    const cellContent = [];
    if (imgEl) cellContent.push(imgEl);
    if (textEl) cellContent.push(textEl);
    return [label, cellContent]; // 2 columns for each tab row
  });

  // 6. Compose the table: header row (1 column), followed by content rows (2 columns)
  const tableData = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // 7. Replace the original element with the table
  element.replaceWith(table);
}
