/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to resolve URLs to absolute
  function resolveUrl(url) {
    if (!url) return '';
    const a = document.createElement('a');
    a.href = url;
    return a.href;
  }

  // Header row matches exactly
  const headerRow = ['Hero (hero29)'];

  // Find the background image (desktop)
  let bgImg = element.querySelector('.cubre-m-horGraphic__bg img.cubre-m-horGraphic__img.-pc') || element.querySelector('.cubre-m-horGraphic__bg img');
  if (bgImg && bgImg.src && !/^https?:/.test(bgImg.src)) {
    bgImg.src = resolveUrl(bgImg.getAttribute('src'));
  }

  // Compose the content: title, description, and CTA (all text content)
  const contentParts = [];
  // Title as heading
  const title = element.querySelector('.cubre-m-horGraphic__title');
  if (title && title.textContent.trim()) {
    const h2 = document.createElement('h2');
    h2.textContent = title.textContent.trim();
    contentParts.push(h2);
  }
  // Description/subheading as paragraph
  const desc = element.querySelector('.cubre-m-horGraphic__text .cubre-o-textContent');
  if (desc && desc.textContent.trim()) {
    const p = document.createElement('p');
    p.textContent = desc.textContent.trim();
    contentParts.push(p);
  }
  // CTA (icon link under .cubre-m-horGraphic__link)
  const cta = element.querySelector('.cubre-m-horGraphic__link .cubre-a-iconLink');
  if (cta) {
    contentParts.push(cta); // reference existing element
  }

  // Compose cells: header, bg image, content
  const cells = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentParts.length === 1 ? contentParts[0] : contentParts]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
