/* global WebImporter */
export default function parse(element, { document }) {
  // Build table header row as per the block name in the example
  const headerRow = ['Accordion (accordion15)'];
  const rows = [headerRow];

  // Select all accordion items (li.cubre-m-collapse__item)
  const items = element.querySelectorAll(':scope > ol > li.cubre-m-collapse__item');
  items.forEach((item) => {
    // Title is the .cubre-m-collapse__title <a>
    const title = item.querySelector('.cubre-m-collapse__title');
    // Content is the .cubre-m-collapse__content <div>
    const content = item.querySelector('.cubre-m-collapse__content');
    if (title && content) {
      // Reference the original nodes directly
      rows.push([title, content]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
