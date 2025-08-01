/* global WebImporter */
export default function parse(element, { document }) {
  // Find all the slides inside the carousel block
  const slides = Array.from(element.querySelectorAll(':scope > .cubre-m-horGraphicTab__content'));

  const rows = [['Carousel (carousel16)']]; // header row matching the example exactly

  slides.forEach((slide) => {
    // Each slide
    const wrap = slide.querySelector('.cubre-m-horGraphic__wrap');
    if (!wrap) return; // Robust to missing structure

    // Image cell (must be the <img> element or null)
    let imgEl = null;
    const imgWrap = wrap.querySelector('.cubre-m-horGraphic__pic img');
    if (imgWrap) {
      imgEl = imgWrap;
    }

    // Text cell: build an array of content
    const contentRoot = wrap.querySelector('.cubre-m-horGraphic__content');
    const cellContent = [];
    if (contentRoot) {
      // Title as heading
      const title = contentRoot.querySelector('.cubre-m-horGraphic__title');
      if (title && title.textContent.trim()) {
        const h2 = document.createElement('h2');
        h2.textContent = title.textContent.trim();
        cellContent.push(h2);
      }
      // Description/content (preserve inline HTML)
      const desc = contentRoot.querySelector('.cubre-m-horGraphic__text .cubre-o-textContent');
      if (desc && desc.innerHTML.trim()) {
        // Put the content in a div to preserve possible <br> or formatting
        const descDiv = document.createElement('div');
        descDiv.innerHTML = desc.innerHTML;
        cellContent.push(descDiv);
      }
      // CTA button: anchor only, reference the <a> directly
      const cta = contentRoot.querySelector('.cubre-m-horGraphic__btn a');
      if (cta) {
        cellContent.push(cta);
      }
    }
    // Push the row, per spec: [image, text cell]
    rows.push([
      imgEl,
      cellContent
    ]);
  });

  // Build the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
