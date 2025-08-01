/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: block name, single column
  const headerRow = ['Table (striped, tableStriped44)'];

  // 2. Find the data table (should only be one main one)
  const resultTable = element.querySelector('table');
  if (!resultTable) return;

  // 3. Get the column headers (second row: array of column labels)
  let columnRow = [];
  const thead = resultTable.querySelector('thead');
  if (thead) {
    const ths = thead.querySelectorAll('tr > th');
    // Each column cell should preserve all text and child elements
    columnRow = Array.from(ths).map((th) => {
      // If there's only one child and it's text, just use string
      if (th.childNodes.length === 1 && th.childNodes[0].nodeType === Node.TEXT_NODE) {
        return th.textContent.trim();
      } else {
        // Otherwise, reference all child nodes (preserving spans etc)
        return Array.from(th.childNodes).filter((n) => {
          return n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && n.textContent.trim() !== '');
        });
      }
    });
  }

  // 4. Data rows: all tbody rows, cells reference their child nodes directly, preserving all text
  const rows = [];
  const tbody = resultTable.querySelector('tbody');
  if (tbody) {
    const trs = tbody.querySelectorAll('tr');
    trs.forEach((tr) => {
      const row = [];
      const tds = tr.querySelectorAll('td');
      tds.forEach((td) => {
        // If td contains only one text node, use string
        if (td.childNodes.length === 1 && td.childNodes[0].nodeType === Node.TEXT_NODE) {
          row.push(td.textContent.trim());
        } else {
          // Otherwise preserve all child nodes (text+elements)
          const contents = Array.from(td.childNodes).filter((n) => {
            return n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && n.textContent.trim() !== '');
          });
          // If only one item, push directly, else as array
          if (contents.length === 1) {
            row.push(contents[0]);
          } else {
            row.push(contents);
          }
        }
      });
      rows.push(row);
    });
  }

  // 5. Build the table structure as required
  const cells = [
    headerRow,
    columnRow,
    ...rows
  ];

  // 6. Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
