/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .swiper-wrapper containing the columns
  const wrapper = element.querySelector(':scope > .swiper-wrapper');
  if (!wrapper) return;
  // Get all top-level <a> elements as columns
  const columns = Array.from(wrapper.children).filter(child => child.tagName === 'A');
  // For each column, collect content (usually <p> elements)
  const cells = columns.map(col => {
    const content = Array.from(col.childNodes).filter(node => {
      // Exclude empty text nodes
      return !(node.nodeType === 3 && !node.textContent.trim());
    });
    return content.length === 1 ? content[0] : content;
  });
  // The header row must be a single cell (array with one string)
  const tableData = [
    ['Columns (columns2)'],
    cells
  ];
  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
