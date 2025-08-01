/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row for the block table, as per requirements
  const headerRow = ['Tabs (tabs24)', ''];
  const cells = [headerRow];

  // Get all tab label/content pairs from .smart_say elements
  // These are direct children of .smart_inner
  const inner = element.querySelector('.smart_inner');
  if (!inner) {
    // Defensive: if the structure is missing, don't replace
    return;
  }
  const sayDivs = Array.from(inner.querySelectorAll('.smart_say'));

  sayDivs.forEach((sayDiv) => {
    // For the label: Try to extract from id or from within the .say content
    let label = '';
    // Use the id as fallback, but try to obtain a label from the .say content
    // Usually the first span or first text node inside .say > p
    const sayContent = sayDiv.querySelector('.say');
    let labelCandidate = '';
    if (sayContent) {
      // Try to get the first <span> inside .say > p
      const p = sayContent.querySelector('p');
      if (p) {
        const spans = p.querySelectorAll('span');
        if (spans.length > 0) {
          labelCandidate = spans[0].textContent.trim();
        }
      }
    }
    // If labelCandidate is empty, fallback to id
    label = labelCandidate || sayDiv.id || 'Tab';

    // Use the .say div as content reference if it exists
    if (sayContent) {
      cells.push([label, sayContent]);
    }
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
