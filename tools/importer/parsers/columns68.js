/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main flipBox container
  const flipBox = element.querySelector('.cubre-m-flipBox');
  if (!flipBox) return;

  // Get all the immediate flipBox__item elements (these are the columns)
  const cardItems = Array.from(flipBox.querySelectorAll(':scope > .cubre-m-flipBox__wrap > .cubre-m-flipBox__item'));

  // For each card, use the back face for the main content
  const cellsRow = cardItems.map((item) => {
    // The card
    const card = item.querySelector('.cubre-m-flipCard');
    if (!card) return '';
    // Use the back face for the content
    const back = card.querySelector('.cubre-m-flipCard__back');
    if (!back) return '';
    // Compose the cell content preserving semantic structure
    const content = [];
    // Title
    const title = back.querySelector('.cubre-m-flipCard__title');
    if (title) content.push(title);
    // Text
    const text = back.querySelector('.cubre-m-flipCard__text');
    if (text) content.push(text);
    // SubLink
    const subLink = back.querySelector('.cubre-m-flipCard__subLink');
    if (subLink && subLink.children.length > 0) {
      content.push(subLink);
    }
    // Additional card link (may exist as a sibling)
    const cardLink = item.querySelector('.cubre-m-flipCard__link');
    if (cardLink) {
      content.push(cardLink);
    }
    return content;
  });

  // The header row: a single cell spanning all columns
  // (The createTable function will render this as a row with a single th, even if there are more columns in the next row)
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns68)'],
    cellsRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}
