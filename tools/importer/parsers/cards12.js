/* global WebImporter */
export default function parse(element, { document }) {
  // Find all card items
  const swiperWrapper = element.querySelector('.swiper-wrapper');
  if (!swiperWrapper) return;
  const cardEls = swiperWrapper.querySelectorAll(':scope > .cubre-o-compare__item');
  const rows = [];
  // Header row: single cell, per instructions
  rows.push(['Cards (cards12)']);

  cardEls.forEach(cardEl => {
    // LEFT cell: No image/icon present, so empty string
    const leftCell = '';
    // RIGHT cell: Compose a container to hold all structured info
    const card = cardEl.querySelector('.cubre-m-compareCard');
    const rightCell = document.createElement('div');
    // Subtitle (if present and meaningful)
    const subtitle = card.querySelector('.cubre-m-compareCard__text');
    if (subtitle && subtitle.textContent.trim()) {
      const subtitleDiv = document.createElement('div');
      subtitleDiv.textContent = subtitle.textContent.trim();
      rightCell.appendChild(subtitleDiv);
    }
    // Title (if present and meaningful)
    const title = card.querySelector('.cubre-m-compareCard__title');
    if (title && title.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      rightCell.appendChild(strong);
    }
    // Features (as a whole block, preserving any list structure)
    const featureBlock = card.querySelector('.cubre-m-compareCard__feature');
    if (featureBlock) {
      rightCell.appendChild(featureBlock);
    }
    // Note (as a whole block)
    const noteBlock = card.querySelector('.cubre-m-compareCard__note');
    if (noteBlock) {
      rightCell.appendChild(noteBlock);
    }
    // Notice link (as a whole block)
    const linkBlock = card.querySelector('.cubre-m-compareCard__link');
    if (linkBlock) {
      // Only append the visible anchor, not the hidden popup
      const noticeLink = linkBlock.querySelector('a.cubre-a-iconLink');
      if (noticeLink) rightCell.appendChild(noticeLink);
    }
    // CTA button (as a whole block)
    const btnBlock = card.querySelector('.cubre-m-compareCard__btn');
    if (btnBlock) {
      // Use the anchor/button as-is
      const cta = btnBlock.querySelector('a,button');
      if (cta) rightCell.appendChild(cta);
    }
    // Fallback: if nothing was appended, add all text
    if (!rightCell.hasChildNodes()) {
      rightCell.textContent = card.textContent.trim();
    }
    rows.push([leftCell, rightCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
