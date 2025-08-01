/* global WebImporter */
export default function parse(element, { document }) {
  // 1. HEADER ROW: Block name exactly as in the example
  const headerRow = ['Hero (hero9)'];

  // 2. BACKGROUND IMAGE ROW: Use first .cubre-m-productKv__bg > img.-pc if available, else the first image in that block
  let bgImg = null;
  const bgDiv = element.querySelector('.cubre-m-productKv__bg');
  if (bgDiv) {
    bgImg = bgDiv.querySelector('img.-pc') || bgDiv.querySelector('img');
  }
  const bgRow = [bgImg ? bgImg : ''];

  // 3. CONTENT ROW: Title, subtitle, CTA, features, illustration (in order and as present)
  const contentElements = [];

  // Title (as Heading)
  const titleDiv = element.querySelector('.cubre-m-productKv__title');
  if (titleDiv) {
    const p = titleDiv.querySelector('p');
    if (p && p.textContent.trim()) {
      // Use a heading tag (h1)
      const h1 = document.createElement('h1');
      h1.textContent = p.textContent.trim();
      contentElements.push(h1);
    }
  }
  // Subheading
  const subDiv = element.querySelector('.cubre-m-productKv__subTitle');
  if (subDiv) {
    const p = subDiv.querySelector('p');
    if (p && p.textContent.trim()) {
      // Use a heading tag (h2)
      const h2 = document.createElement('h2');
      h2.textContent = p.textContent.trim();
      contentElements.push(h2);
    }
  }
  // CTA Button: first anchor in .cubre-m-productKv__btn
  const btnDiv = element.querySelector('.cubre-m-productKv__btn');
  if (btnDiv) {
    const a = btnDiv.querySelector('a');
    if (a && a.href) {
      // Reference the real <a> element from the DOM. Do not clone or create new.
      contentElements.push(a);
    }
  }
  // Features (icon + text): ref whole .cubre-m-productKv__feature if exists
  const featureDiv = element.querySelector('.cubre-m-productKv__feature');
  if (featureDiv) {
    contentElements.push(featureDiv);
  }
  // Illustration image: .cubre-m-productKv__pic img (typically on the side)
  const illuDiv = element.querySelector('.cubre-m-productKv__pic');
  if (illuDiv) {
    const illuImg = illuDiv.querySelector('img');
    if (illuImg) {
      contentElements.push(illuImg);
    }
  }
  const contentRow = [contentElements];

  // Compose final table
  const rows = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the input element in the DOM
  element.replaceWith(table);
}
