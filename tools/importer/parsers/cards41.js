/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get trimmed text from a node
  function extractText(node) {
    return node ? node.textContent.trim().replace(/\s+/g, ' ') : '';
  }

  // Compose block rows
  const rows = [['Cards (cards41)']]; // header row as in example

  // Query all card elements
  const cardNodes = element.querySelectorAll('.cubre-o-table__item.currency');

  cardNodes.forEach(cardNode => {
    // --- Column 1: Image ---
    let img = cardNode.querySelector('.cubre-m-currency__img img');

    // --- Column 2: Title, Description, CTA ---
    const col2 = [];
    // Title: strong as in example, text from .cubre-m-currency__name
    const titleNode = cardNode.querySelector('.cubre-m-currency__name');
    if (titleNode) {
      const strong = document.createElement('strong');
      strong.textContent = extractText(titleNode);
      col2.push(strong);
    }
    // Description: for each rate row
    const rateTable = cardNode.querySelector('table.cubre-m-rateTable');
    if (rateTable) {
      const tbodyRows = rateTable.querySelectorAll('tbody tr');
      tbodyRows.forEach(tr => {
        const tds = tr.querySelectorAll('td');
        if (tds.length === 3) {
          const itemLabel = extractText(tds[0]);
          const buy = extractText(tds[1]);
          const sell = extractText(tds[2]);
          const p = document.createElement('p');
          p.textContent = `${itemLabel}: 買進 ${buy} / 賣出 ${sell}`;
          col2.push(p);
        }
      });
    }
    // CTA: always use visible text, never include images
    const cta = cardNode.querySelector('.cubre-m-currency__action a[data-history-link]');
    if (cta) {
      const label = cta.querySelector('.cubre-a-iconLink__text');
      if (label) {
        // Use original link text, but always as an <a href="#">
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = extractText(label);
        col2.push(link);
      }
    }
    rows.push([
      img ? img : '',
      col2.length ? col2 : ''
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
