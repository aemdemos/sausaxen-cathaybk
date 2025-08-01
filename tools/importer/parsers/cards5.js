/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const cells = [['Cards (cards5)']];

  // Find the popup that contains the card steps
  const popup = element.querySelector('.cubre-m-popup');
  if (!popup) return;
  const stepsList = popup.querySelector('ol');
  if (!stepsList) return;

  // For each card/step in the list
  stepsList.querySelectorAll(':scope > li').forEach(li => {
    // Get the first image/icon in card
    const img = li.querySelector('img');

    // Compose the text content (title and description if available)
    const frag = document.createDocumentFragment();
    const title = li.querySelector('.cubre-m-insideStep__title');
    const desc = li.querySelector('.cubre-m-insideStep__text');
    let hadTitle = false;
    if (title && title.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      frag.appendChild(strong);
      hadTitle = true;
    }
    if (desc && desc.textContent.trim()) {
      if (hadTitle) frag.appendChild(document.createElement('br'));
      frag.appendChild(document.createTextNode(desc.textContent.trim()));
    }
    // In case both title and desc are missing, include all textContent
    if (!frag.textContent.trim()) {
      frag.appendChild(document.createTextNode(li.textContent.trim()));
    }
    // Add the row to the table
    cells.push([
      img,
      frag
    ]);
  });

  // Create table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
