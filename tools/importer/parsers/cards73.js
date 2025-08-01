/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per example
  const rows = [['Cards (cards73)']];

  // Find all card items
  const cardItems = element.querySelectorAll('.cubre-o-puzzle__item');

  cardItems.forEach((card) => {
    // Use the image block (includes both pc/mb images, left as-is for responsive)
    const imgWrap = card.querySelector('.cubre-m-puzzle__pic');

    // For text, get the card's main content area, extracting title and description/list
    const contentArea = card.querySelector('.cubre-m-puzzle__content') || card;
    const wrap = contentArea.querySelector('.cubre-m-puzzle__wrap') || contentArea;
    const title = wrap.querySelector('.cubre-m-puzzle__title');
    const desc = wrap.querySelector('.cubre-m-puzzle__text');
    
    // Create text cell, always order title (if present) then description (if present)
    const textCell = [];
    if (title) textCell.push(title);
    if (desc) textCell.push(desc);
    // If neither found, include all text content
    if (textCell.length === 0) {
      // Remove the image block if present in wrap (avoid duplicate in text cell)
      if (imgWrap && wrap.contains(imgWrap)) imgWrap.remove();
      // Remove any .cubre-m-puzzle__more/.cubre-m-puzzle__less blocks
      wrap.querySelectorAll('.cubre-m-puzzle__more, .cubre-m-puzzle__less').forEach(e=>e.remove());
      textCell.push(wrap);
    }
    rows.push([
      imgWrap,
      textCell.length === 1 ? textCell[0] : textCell
    ]);
  });

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
