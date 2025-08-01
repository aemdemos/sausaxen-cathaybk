/* global WebImporter */
export default function parse(element, { document }) {
  // Always start with the exact header row, single cell
  const headerRow = ['Cards (cards35)'];
  const rows = [headerRow];

  // Find all card roots for this block
  const cards = element.querySelectorAll('.cubre-o-slideCard__item');
  cards.forEach(card => {
    // Find the image (first img in the card)
    const imgContainer = card.querySelector('.cubre-m-collapseCard__pic');
    const imgEl = imgContainer ? imgContainer.querySelector('img') : null;

    // Find content box (title, description, CTA if any)
    const contentBox = card.querySelector('.cubre-m-collapseCard__content');
    const textContentArr = [];

    if (contentBox) {
      // Title: strong as first element (extract plain text)
      const title = contentBox.querySelector('.cubre-m-collapseCard__title');
      if (title && title.textContent.trim()) {
        const strong = document.createElement('strong');
        strong.textContent = title.textContent.trim();
        textContentArr.push(strong);
      }
      // Description(s): all .cubre-o-textContent in .cubre-m-collapseCard__wrap
      const descriptions = contentBox.querySelectorAll('.cubre-m-collapseCard__wrap .cubre-o-textContent');
      descriptions.forEach(desc => {
        // If text node only, wrap in <p>; otherwise, allow original structure
        if (desc.children.length === 0) {
          const p = document.createElement('p');
          p.textContent = desc.textContent.trim();
          textContentArr.push(p);
        } else {
          // If has children (eg. list), include all
          Array.from(desc.childNodes).forEach(node => {
            textContentArr.push(node);
          });
        }
      });
      // CTA/link(s): look for any a inside .cubre-m-collapseCard__subLink inside .cubre-m-collapseCard__wrap or direct
      const subLinks = contentBox.querySelectorAll('.cubre-m-collapseCard__subLink a, .cubre-m-collapseCard__subLink .cubre-a-iconLink');
      subLinks.forEach(link => {
        // Add <br> if not first content
        if (textContentArr.length > 0) textContentArr.push(document.createElement('br'));
        textContentArr.push(link);
      });
    }

    // Fallback: if no text collected, use trimmed textContent from contentBox
    if (textContentArr.length === 0 && contentBox) {
      const txt = contentBox.textContent.trim();
      if (txt) textContentArr.push(document.createTextNode(txt));
    }

    // Each row: [image, text cell]. Always reference the actual element from the DOM, never clone.
    rows.push([
      imgEl || '',
      textContentArr.length > 1 ? textContentArr : (textContentArr[0] || '')
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
