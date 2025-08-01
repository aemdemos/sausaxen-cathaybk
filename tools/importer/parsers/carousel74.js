/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: make an h2 heading from text
  function createHeading(text) {
    const h2 = document.createElement('h2');
    h2.textContent = text;
    return h2;
  }

  // Find all slides: direct children with [data-graphic-tab-content]
  const slides = Array.from(element.querySelectorAll(':scope > .cubre-m-horGraphicTab__content'));

  const rows = [];
  // Header row (exactly as in the example)
  rows.push(['Carousel (carousel74)']);

  slides.forEach((slide) => {
    // Image cell
    let imgEl = null;
    const imgWrap = slide.querySelector('.cubre-m-horGraphic__pic img');
    if (imgWrap) {
      imgEl = imgWrap;
    }
    // Text + CTA cell
    const contentWrap = slide.querySelector('.cubre-m-horGraphic__content');
    const arr = [];
    if (contentWrap) {
      // Title
      const title = contentWrap.querySelector('.cubre-m-horGraphic__title');
      if (title && title.textContent.trim()) {
        arr.push(createHeading(title.textContent.trim()));
      }
      // Description/Body
      const desc = contentWrap.querySelector('.cubre-m-horGraphic__text');
      if (desc) {
        arr.push(desc);
      }
      // CTAs (anchor links)
      const ctaBtns = contentWrap.querySelectorAll('.cubre-m-horGraphic__btn .cubre-o-action__item a');
      if (ctaBtns.length > 0) {
        // Add a <br> if there is other text above
        if (arr.length > 0) {
          arr.push(document.createElement('br'));
        }
        ctaBtns.forEach((a, idx) => {
          arr.push(a);
          if (idx !== ctaBtns.length - 1) {
            arr.push(document.createTextNode(' '));
          }
        });
      }
    }
    // Each row is [image, [title, body, ctas]]
    rows.push([
      imgEl,
      arr.length === 1 ? arr[0] : arr
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
