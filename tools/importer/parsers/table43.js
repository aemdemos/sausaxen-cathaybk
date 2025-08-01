/* global WebImporter */
export default function parse(element, { document }) {
  // Collect all child nodes (including text nodes and elements) to preserve all content and structure
  const fragment = document.createDocumentFragment();
  while (element.firstChild) {
    fragment.appendChild(element.firstChild); // This moves nodes, not clones, so DOM structure is preserved
  }
  // Compose the table block as required
  const cells = [
    ['Table'],
    [fragment]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
