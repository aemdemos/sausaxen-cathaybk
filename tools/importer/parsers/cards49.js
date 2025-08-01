/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to collect all block-level content for the card text cell
  function collectCardTextContent(dataDiv) {
    const blocks = [];
    // Title (if any)
    const title = dataDiv.querySelector('.cubre-m-simpleGraphic__title');
    if (title) blocks.push(title);
    // Description (if any)
    const desc = dataDiv.querySelector('.cubre-m-simpleGraphic__text');
    if (desc) blocks.push(desc);
    // All .cubre-m-simpleGraphic__link blocks (these may contain links, popups, etc.)
    dataDiv.querySelectorAll('.cubre-m-simpleGraphic__link').forEach(link => {
      if (link.textContent.trim() || link.querySelector('a')) {
        blocks.push(link);
      }
    });
    return blocks.length > 0 ? blocks : '';
  }

  // Table header per requirements
  const table = [['Cards (cards49)']];

  // Find all cards within the element
  element.querySelectorAll('.cubre-o-graphic__item').forEach(cardItem => {
    // Get the image: first <img> inside .cubre-m-simpleGraphic__pic
    const pic = cardItem.querySelector('.cubre-m-simpleGraphic__pic');
    let img = '';
    if (pic) {
      const foundImg = pic.querySelector('img');
      if (foundImg) img = foundImg;
    }
    // Get the text content block
    let textCell = '';
    const dataDiv = cardItem.querySelector('.cubre-m-simpleGraphic__data');
    if (dataDiv) {
      textCell = collectCardTextContent(dataDiv);
    }
    table.push([img, textCell]);
  });

  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}
