/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match the example exactly
  const headerRow = ['Cards (cards11)'];
  const cells = [headerRow];

  // Find the cards container
  const component = element.querySelector('.cubre-o-block__component');
  if (!component) return;

  // Find all card containers
  const puzzleItems = component.querySelectorAll('.cubre-o-puzzle__item');
  puzzleItems.forEach((item) => {
    const cards = item.querySelectorAll('.cubre-m-puzzle');
    cards.forEach((card) => {
      // --- IMAGE CELL ---
      // Use .cubre-m-puzzle__pic > img.-pc if it exists, fallback to img.-mb
      let img = card.querySelector('.cubre-m-puzzle__pic img.cubre-m-puzzle__img.-pc');
      if (!img) img = card.querySelector('.cubre-m-puzzle__pic img.cubre-m-puzzle__img.-mb');
      let imageCell = img;
      // If no image at all, fallback to an empty element
      if (!imageCell) imageCell = document.createElement('span');

      // --- TEXT CELL ---
      // Compose a div from the title, description, CTA if present, referencing source elements
      const textElements = [];
      // Title: .cubre-m-puzzle__title
      const title = card.querySelector('.cubre-m-puzzle__title');
      if (title && title.textContent.trim()) {
        const strong = document.createElement('strong');
        strong.textContent = title.textContent.trim();
        textElements.push(strong);
      }
      // Description: .cubre-o-textContent (inside .cubre-m-puzzle__text)
      const desc = card.querySelector('.cubre-o-textContent');
      if (desc && desc.textContent.trim()) {
        const descDiv = document.createElement('div');
        descDiv.textContent = desc.textContent.trim();
        textElements.push(descDiv);
      }
      // CTA: .cubre-a-iconLink (text and link only, not images)
      const cta = card.querySelector('.cubre-m-puzzle__link a.cubre-a-iconLink');
      if (cta) {
        const ctaText = cta.querySelector('.cubre-a-iconLink__text');
        if (ctaText && ctaText.textContent.trim()) {
          const ctaA = document.createElement('a');
          ctaA.href = cta.href;
          ctaA.textContent = ctaText.textContent.trim();
          if (cta.target) ctaA.target = cta.target;
          if (cta.rel) ctaA.rel = cta.rel;
          textElements.push(ctaA);
        }
      }
      // Wrap all in a div (if any text exists)
      let textCell;
      if (textElements.length) {
        textCell = document.createElement('div');
        textElements.forEach(el => textCell.appendChild(el));
      } else {
        // fallback for empty cards (should not happen)
        textCell = document.createElement('span');
      }
      cells.push([imageCell, textCell]);
    });
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
