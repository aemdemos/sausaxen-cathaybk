/* global WebImporter */
export default function parse(element, { document }) {
  // Get tab buttons
  const slider = element.querySelector('.cubre-m-anchor__slider .swiper-wrapper');
  const tabLinks = slider ? Array.from(slider.querySelectorAll('.cubre-m-anchor__btn')) : [];
  // Get main CTA if present
  const cta = element.querySelector('.cubre-m-anchor__kvBtn .cubre-m-button');

  // Prepare data rows: each [label, content]
  const rows = tabLinks.map((btn, idx) => {
    let label = '';
    const p = btn.querySelector('p');
    if (p) {
      label = p.textContent.trim();
    } else {
      label = btn.textContent.trim();
    }
    let content = '';
    if (idx === 0 && cta) {
      content = cta;
    }
    return [label, content];
  });

  // Header row: one cell
  const cells = [['Tabs (tabs25)'], ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Fix the header cell to span two columns if there are two columns in data rows
  const th = table.querySelector('th');
  if (th && rows.length > 0 && rows[0].length === 2) {
    th.setAttribute('colspan', '2');
  }

  element.replaceWith(table);
}
