/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the example
  const cells = [['Cards']];

  // Get all immediate <a> children representing the cards
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  cardLinks.forEach(link => {
    // Try to find a <p> for the card text
    let cardContent = link.querySelector('p');
    if (cardContent) {
      // Use the actual <p> node from the DOM
      cells.push([cardContent]);
    } else {
      // If no <p>, use the link's text content in a <span>
      const fallback = document.createElement('span');
      fallback.textContent = link.textContent.trim();
      cells.push([fallback]);
    }
  });

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
