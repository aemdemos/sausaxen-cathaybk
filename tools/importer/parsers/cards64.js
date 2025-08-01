/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [['Cards (cards64)']];
  // Select direct card items
  const cardItems = element.querySelectorAll(':scope > .cubre-o-iconCard__item');
  cardItems.forEach(card => {
    const icon = card.querySelector('.cubre-m-iconEssay__icon img');
    // Always reference existing icon element
    // Get text content elements
    const content = card.querySelector('.cubre-m-iconEssay__content');
    const desc = content && content.querySelector('.cubre-m-iconEssay__desc');
    const title = content && content.querySelector('.cubre-m-iconEssay__title');
    // Build text cell
    const textCell = document.createElement('div');
    // Description first (always above title)
    if (desc && desc.textContent.trim()) {
      const descDiv = document.createElement('div');
      descDiv.textContent = desc.textContent.trim();
      textCell.appendChild(descDiv);
    }
    if (title && title.innerHTML.trim()) {
      const titleDiv = document.createElement('div');
      titleDiv.innerHTML = title.innerHTML; // preserve <br>
      titleDiv.style.fontWeight = 'bold'; // visually distinct as heading
      textCell.appendChild(titleDiv);
    }
    rows.push([
      icon,
      textCell
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
