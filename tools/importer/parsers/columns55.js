/* global WebImporter */
export default function parse(element, { document }) {
  // Get all card items (columns)
  const cardItems = Array.from(element.querySelectorAll('.cubre-o-card__item'));
  if (!cardItems.length) return;

  // Each card's content (head + content)
  const colCells = cardItems.map(card => {
    const parts = [];
    const head = card.querySelector('.cubre-o-linkGroup__head');
    if (head) parts.push(head);
    const content = card.querySelector('.cubre-o-linkGroup__content');
    if (content) parts.push(content);
    return parts.length > 1 ? parts : parts[0] || '';
  });

  // Organize into rows of 2 columns each (grid structure)
  const bodyRows = [];
  for (let i = 0; i < colCells.length; i += 2) {
    bodyRows.push([colCells[i], colCells[i + 1] || '']);
  }

  // Header row
  const cells = [['Columns (columns55)']];
  // Add body rows
  cells.push(...bodyRows);

  // Create the block table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}