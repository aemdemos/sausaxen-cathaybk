/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: safely get direct child by class
  function getChildByClass(parent, className) {
    for (const child of parent.children) {
      if (child.classList && child.classList.contains(className)) return child;
    }
    return null;
  }

  // Header row: single column ONLY
  const cells = [
    ['Cards (cards80)']
  ];

  // Find all cards
  const cardNodes = element.querySelectorAll('.cubre-o-compare__item');

  cardNodes.forEach((card) => {
    // First col is always empty string (no image/icon in this HTML)
    const firstCell = '';
    // Build the second cell: content area
    const frag = document.createDocumentFragment();
    const cardContainer = card.querySelector('.cubre-m-compareCard');

    // Title (top label)
    const label = getChildByClass(cardContainer, 'cubre-m-compareCard__text');
    if (label && label.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = label.textContent.trim();
      frag.appendChild(strong);
      frag.appendChild(document.createElement('br'));
    }
    // Big title (subtitle)
    const bigTitle = getChildByClass(cardContainer, 'cubre-m-compareCard__title');
    if (bigTitle && bigTitle.textContent.trim()) {
      const span = document.createElement('span');
      span.style.fontWeight = 'bold';
      span.textContent = bigTitle.textContent.trim();
      frag.appendChild(span);
      frag.appendChild(document.createElement('br'));
    }
    // SubTitle line (optional, usually a <p> inside .cubre-m-compareCard__subTitle)
    const subTitleWrap = getChildByClass(cardContainer, 'cubre-m-compareCard__subTitle');
    if (subTitleWrap) {
      for (const child of subTitleWrap.childNodes) {
        if (child.nodeType === Node.ELEMENT_NODE) frag.appendChild(child);
      }
    }
    // Features (list of items)
    const featuresWrap = card.querySelector('.cubre-m-feature');
    if (featuresWrap) {
      frag.appendChild(featuresWrap);
    }
    // Actions: links and buttons
    const actionWrap = card.querySelector('.cubre-m-compareCard__action');
    if (actionWrap) {
      const links = Array.from(actionWrap.querySelectorAll('a')).filter(a => a.textContent && a.textContent.trim());
      if (links.length) {
        const actionsDiv = document.createElement('div');
        links.forEach((a, idx) => {
          actionsDiv.appendChild(a);
          if (idx < links.length - 1) actionsDiv.appendChild(document.createTextNode(' '));
        });
        frag.appendChild(actionsDiv);
      }
    }
    // Each row after the header must be [firstCell, frag] (two columns)
    cells.push([firstCell, frag]);
  });

  // Create and replace with block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
