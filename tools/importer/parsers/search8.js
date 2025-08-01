/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Prepare the header row as shown in the example
  const headerRow = ['Search'];

  // 2. Gather all relevant content from the block
  //    This block's visible content is the label/title (if present) and the search field area
  const cells = [];

  // Try to get the visible title/label (e.g., "關鍵字搜尋")
  const titleDiv = element.querySelector('.cubre-o-formRow__title');
  let labelText = '';
  if (titleDiv) {
    labelText = titleDiv.textContent.trim();
  }

  // Get the search box area (including input, button, errors, etc)
  const contentDiv = element.querySelector('.cubre-o-formRow__content');
  // Compose a cell containing the title (if any), then the search UI
  const cellElements = [];
  if (labelText) {
    // Use a <p> for the label to preserve semantic separation
    const labelP = document.createElement('p');
    labelP.textContent = labelText;
    cellElements.push(labelP);
  }
  if (contentDiv) {
    cellElements.push(contentDiv);
  }

  // Fallback: if no contentDiv, just push the whole element (very unlikely)
  if (cellElements.length === 0) {
    cellElements.push(element);
  }

  // 3. Build the table rows as in the markdown example: header, then content
  cells.push(headerRow, [cellElements]);

  // 4. Replace element with the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}