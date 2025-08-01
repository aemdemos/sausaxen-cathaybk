/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row: single cell as required
  const cells = [
    ['Columns (columns42)'], // header row: single column
  ];

  // Get the main card link
  const cardLink = element.querySelector('a.cubre-m-eventCard');
  if (!cardLink) return;

  // Prepare left column: image
  let leftCell = [];
  const img = cardLink.querySelector('.cubre-m-eventCard__pic img');
  if (img) leftCell.push(img);

  // Prepare right column: title (bold) and date
  let rightCell = [];
  const content = cardLink.querySelector('.cubre-m-eventCard__content');
  if (content) {
    // Title
    const title = content.querySelector('.cubre-m-eventCard__title');
    if (title && title.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      rightCell.push(strong);
      rightCell.push(document.createElement('br'));
    }
    // Date
    const date = content.querySelector('.cubre-m-eventCard__date');
    if (date && date.textContent.trim()) {
      rightCell.push(document.createTextNode(date.textContent.replace(/\s+/g, ' ').trim()));
    }
  }

  // Second row: as many columns as content (2 columns for this layout)
  cells.push([leftCell, rightCell]);

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
