/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero60) block: header row
  const headerRow = ['Hero (hero60)'];

  // Find the most appropriate hero image for background
  // Prefer desktop, fallback to mobile or first image
  let bgImg = element.querySelector('.cubre-m-kv__bg .cubre-m-kv__img.-pc')
    || element.querySelector('.cubre-m-kv__bg .cubre-m-kv__img.-mb')
    || element.querySelector('.cubre-m-kv__bg img')
    || element.querySelector('img');
  const bgImgCell = bgImg ? bgImg : '';

  // Content cell: All text, headings, subheadings, and CTAs
  const contentElements = [];
  const box = element.querySelector('.cubre-m-kv__box');
  if (box) {
    // Title (div, promote to h1)
    const title = box.querySelector('.cubre-m-kv__title');
    if (title && title.textContent.trim()) {
      const h1 = document.createElement('h1');
      h1.textContent = title.textContent.trim();
      contentElements.push(h1);
    }
    // Subheading (div, promote to p)
    const subTitle = box.querySelector('.cubre-m-kv__subTitle');
    if (subTitle && subTitle.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = subTitle.textContent.trim();
      contentElements.push(p);
    }
    // CTA buttons
    const btns = box.querySelectorAll('.cubre-m-kv__btn a');
    btns.forEach(a => {
      // Reference the <a> directly
      contentElements.push(a);
    });
  }
  // Fallback: If no .cubre-m-kv__box or it's empty, include all meaningful children except background
  if (contentElements.length === 0) {
    const bg = element.querySelector('.cubre-m-kv__bg');
    Array.from(element.children).forEach(child => {
      if (child !== bg && child.textContent.trim()) {
        contentElements.push(child);
      }
    });
  }

  // Compose table rows
  const rows = [
    headerRow,
    [bgImgCell],
    [contentElements.length ? contentElements : '']
  ];

  // Create block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
