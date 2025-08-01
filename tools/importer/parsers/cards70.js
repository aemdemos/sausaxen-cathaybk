/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per requirements
  const headerRow = ['Cards (cards70)'];
  const rows = [headerRow];

  // Select all top-level card elements
  const cardEls = element.querySelectorAll(':scope > .cubre-o-slideCard__item');

  cardEls.forEach(card => {
    // IMAGE CELL
    const img = card.querySelector('.cubre-m-collapseCard__pic img') || '';

    // TEXT CELL (title, description, CTA)
    const content = card.querySelector('.cubre-m-collapseCard__content');
    let textCellParts = [];

    // Title: keep only text, use <strong>
    let title = content && content.querySelector('.cubre-m-collapseCard__title');
    if (title && title.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      textCellParts.push(strong);
    }
    // Description: .cubre-o-textContent
    const desc = content && content.querySelector('.cubre-m-collapseCard__text .cubre-o-textContent');
    if (desc && desc.textContent.trim()) {
      if (textCellParts.length > 0) textCellParts.push(document.createElement('br'));
      textCellParts.push(desc);
    }
    // CTA: Only include the visible text as a link, not icon images
    const ctaLinkOrig = content && content.querySelector('.cubre-m-collapseCard__link a');
    if (ctaLinkOrig) {
      // Find the label span
      const label = ctaLinkOrig.querySelector('.cubre-a-iconLink__text');
      if (label && label.textContent.trim()) {
        if (textCellParts.length > 0) {
          textCellParts.push(document.createElement('br'));
          textCellParts.push(document.createElement('br'));
        }
        // Reference the original link, but remove icons/images
        const ctaLink = document.createElement('a');
        ctaLink.href = ctaLinkOrig.getAttribute('href') || '#';
        ctaLink.textContent = label.textContent.trim();
        // Also preserve rel/target if present
        if (ctaLinkOrig.hasAttribute('rel')) ctaLink.setAttribute('rel', ctaLinkOrig.getAttribute('rel'));
        if (ctaLinkOrig.hasAttribute('target')) ctaLink.setAttribute('target', ctaLinkOrig.getAttribute('target'));
        textCellParts.push(ctaLink);
      }
    }
    // If nothing else, at least add an empty string to avoid empty cells
    if (textCellParts.length === 0) textCellParts = [''];

    rows.push([img, textCellParts.length === 1 ? textCellParts[0] : textCellParts]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
