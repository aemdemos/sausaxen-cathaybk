/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to build the text cell: includes title, description, and any links
  function createTextCell(mIconEssay) {
    const frag = document.createDocumentFragment();
    // Title (strong)
    const titleDiv = mIconEssay.querySelector('.cubre-m-iconEssay__title');
    if (titleDiv && titleDiv.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = titleDiv.textContent.trim();
      frag.appendChild(strong);
      frag.appendChild(document.createElement('br'));
    }
    // Description
    const descDiv = mIconEssay.querySelector('.cubre-m-iconEssay__desc .cubre-o-textContent');
    if (descDiv && descDiv.textContent.trim()) {
      frag.appendChild(document.createTextNode(descDiv.textContent.trim()));
      frag.appendChild(document.createElement('br'));
    }
    // All links (can be 0, 1 or many)
    const linkDivs = mIconEssay.querySelectorAll('.cubre-m-iconEssay__link');
    linkDivs.forEach((linkDiv, idx) => {
      const a = linkDiv.querySelector('a');
      if (a) {
        // Use span text if present, otherwise the anchor's text
        const span = a.querySelector('span');
        const text = span ? span.textContent.trim() : a.textContent.trim();
        if (text) {
          const link = document.createElement('a');
          link.href = a.href;
          if (a.target) link.target = a.target;
          link.textContent = text;
          frag.appendChild(link);
        }
        // If there are multiple links, add <br> between them (but not after the last one)
        if (idx < linkDivs.length - 1) {
          frag.appendChild(document.createElement('br'));
        }
      }
    });
    return frag;
  }

  // Find all cards
  const cardNodes = element.querySelectorAll('.cubre-o-iconEssay__item');
  const rows = [];
  // Header row matches EXACTLY the example
  rows.push(['Cards (cards59)']);
  // Each card item
  cardNodes.forEach(card => {
    const mIconEssay = card.querySelector('.cubre-m-iconEssay');
    if (!mIconEssay) return;
    // Icon cell (first cell), use the actual <img> node if present
    const iconDiv = mIconEssay.querySelector('.cubre-m-iconEssay__icon');
    let img = null;
    if (iconDiv) {
      img = iconDiv.querySelector('img');
    }
    // Text cell (second cell)
    const textCell = createTextCell(mIconEssay);
    rows.push([
      img,
      textCell
    ]);
  });
  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
