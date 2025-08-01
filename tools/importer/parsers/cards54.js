/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as specified
  const headerRow = ['Cards (cards54)'];
  const rows = [];

  // Find all card items (each card)
  const cardItems = element.querySelectorAll('.cubre-o-puzzle__item');
  cardItems.forEach((item) => {
    // Find the main card container
    const card = item.querySelector('.cubre-m-puzzle');
    if (!card) return;
    // --------- IMAGE COL ---------
    // Use the PC image if available, fallback to mobile
    let img = card.querySelector('img.cubre-m-puzzle__img.-pc');
    if (!img) img = card.querySelector('img.cubre-m-puzzle__img.-mb');

    // --------- TEXT COL ---------
    // Reference the original title and description elements if possible
    const contentWrap = card.querySelector('.cubre-m-puzzle__wrap');
    // Create a fragment to hold text and CTA together
    const frag = document.createDocumentFragment();
    if (contentWrap) {
      // Title (strong)
      const title = contentWrap.querySelector('.cubre-m-puzzle__title');
      if (title && title.textContent.trim()) {
        const strong = document.createElement('strong');
        strong.textContent = title.textContent.trim();
        frag.appendChild(strong);
      }
      // Description (from .cubre-o-textContent -sm under .cubre-m-puzzle__text)
      const descWrap = contentWrap.querySelector('.cubre-m-puzzle__text');
      if (descWrap) {
        // Keep all children (usually one .cubre-o-textContent)
        Array.from(descWrap.childNodes).forEach((node) => {
          // Only append if not empty
          if (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim())) {
            frag.appendChild(node);
          }
        });
      }
    }
    // CTA: Only include relevant visible CTA link once per card (if present)
    // Look for the .cubre-m-puzzle__more or .cubre-m-puzzle__less containing an <a>
    let ctaLink = card.querySelector('.cubre-m-puzzle__more a.cubre-a-collapseLink, .cubre-m-puzzle__less a.cubre-a-collapseLink');
    if (ctaLink) {
      // Use the existing element reference, but only the first one
      frag.appendChild(document.createElement('br'));
      frag.appendChild(ctaLink);
    }
    // Push this card row to the table, always 2 columns
    rows.push([
      img || '',
      frag
    ]);
  });

  // Build the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
