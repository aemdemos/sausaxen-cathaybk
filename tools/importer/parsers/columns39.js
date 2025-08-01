/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main calculator blocks (interest and principal)
  const comp = element.querySelector('.cubre-o-block__component');
  if (!comp) return;

  // Find all tab contents
  const tabContents = comp.querySelectorAll('.cubre-m-tab__content');
  if (!tabContents.length) return;

  // Helper to extract left (input) and right (output/info) for each calculator
  function getColumns(tabContent) {
    const main = tabContent.querySelector('.cubre-o-tabContent__main');
    if (!main) return [document.createTextNode(''), document.createTextNode('')];
    const card = main.querySelector('.cubre-o-calculateCard');
    if (!card) return [document.createTextNode(''), document.createTextNode('')];
    const input = card.querySelector('.cubre-o-calculateCard__input') || document.createTextNode('');
    const output = card.querySelector('.cubre-o-calculateCard__output') || document.createTextNode('');
    return [input, output];
  }

  // Build the 2x2 columns layout (Interest, Principal)
  const cells = [['Columns (columns39)']];
  for (let i = 0; i < Math.min(tabContents.length, 2); i++) {
    cells.push(getColumns(tabContents[i]));
  }

  // Create the table and replace element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
