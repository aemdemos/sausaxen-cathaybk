/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row
  const headerRow = ['Accordion (accordion58)'];
  // Get all direct accordion item elements
  const items = Array.from(element.querySelectorAll(':scope > ol > li'));
  // Build each accordion row
  const rows = items.map(li => {
    // Title cell: use the actual <a> element for semantic/formatting preservation
    const titleAnchor = li.querySelector('.cubre-m-collapse__title');
    let titleCell = '';
    if (titleAnchor) {
      titleCell = titleAnchor;
    }
    // Content cell: use all the children inside .cubre-m-collapse__content
    let contentCell = '';
    const contentEl = li.querySelector('.cubre-m-collapse__content');
    if (contentEl) {
      // Use all of contentEl's children, preserving structure and formatting
      const contentNodes = Array.from(contentEl.childNodes).filter(
        n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim())
      );
      contentCell = contentNodes.length === 1 ? contentNodes[0] : contentNodes;
    }
    return [titleCell, contentCell];
  });
  // Compose the final cells array
  const cells = [headerRow, ...rows];
  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
