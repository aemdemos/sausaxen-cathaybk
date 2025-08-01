/* global WebImporter */
export default function parse(element, { document }) {
  // Header row per spec
  const cells = [['Cards (cards10)']];

  // Find all card groups (each row of cards)
  const cardGroups = element.querySelectorAll('.cubre-o-puzzle__item');
  cardGroups.forEach((group) => {
    // Each card in the group
    const puzzles = group.querySelectorAll(':scope > .cubre-m-puzzle');
    puzzles.forEach((puzzle) => {
      // --- IMAGE ---
      let img = puzzle.querySelector('.cubre-m-puzzle__pic img.cubre-m-puzzle__img.-pc');
      if (!img) img = puzzle.querySelector('.cubre-m-puzzle__pic img');
      
      // --- TEXT CONTENT ---
      const contentParts = [];
      // Title
      const title = puzzle.querySelector('.cubre-m-puzzle__title');
      if (title && title.textContent.trim()) {
        const strong = document.createElement('strong');
        strong.textContent = title.textContent.trim();
        contentParts.push(strong);
      }
      
      // Gather all description and text (preserving structure)
      // Prefer .cubre-m-puzzle__text > .cubre-o-textContent, fallback to anything in .cubre-m-puzzle__content that's not a link section
      const contentWrap = puzzle.querySelector('.cubre-m-puzzle__content');
      if (contentWrap) {
        // Find all .cubre-o-textContent and <p> direct or descendant to catch all descriptions or extra text
        contentWrap.querySelectorAll('.cubre-o-textContent, p').forEach(el => {
          if (el.textContent.trim() && !contentParts.includes(el)) {
            contentParts.push(el);
          }
        });
      }
      
      // CTA links (all <a> from .cubre-m-puzzle__link and .cubre-m-puzzle__subLink only, not from popups)
      // Reference the actual anchor elements (do not clone or create new)
      const linkEls = [];
      puzzle.querySelectorAll('.cubre-m-puzzle__link a, .cubre-m-puzzle__subLink > a').forEach(a => {
        if (!linkEls.includes(a)) linkEls.push(a);
      });
      if (linkEls.length > 0) {
        // Place all links in a div to appear together, as per visual structure
        const linkDiv = document.createElement('div');
        linkEls.forEach(a => linkDiv.appendChild(a));
        contentParts.push(linkDiv);
      }

      // If no text at all, add empty node
      if (contentParts.length === 0) contentParts.push(document.createTextNode(''));
      
      // Compose the row: [image, content]
      cells.push([
        img || document.createTextNode(''),
        contentParts.length === 1 ? contentParts[0] : contentParts
      ]);
    });
  });

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
