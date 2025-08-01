/* global WebImporter */
export default function parse(element, { document }) {
  // Find the form row that contains the relevant selects and input
  const formRow = element.querySelector('.cubre-o-formRow');
  if (!formRow) return;
  const formContent = formRow.querySelector('.cubre-o-formRow__content');
  if (!formContent) return;
  const formBox = formContent.querySelector('.cubre-o-formBox');
  if (!formBox) return;

  // Get all immediate children that make up the columns (.cubre-o-formBox__item)
  const columnItems = Array.from(formBox.querySelectorAll(':scope > .cubre-o-formBox__item'));

  // Ensure header row is a single cell (one column), as per example
  const cells = [
    ['Columns (columns66)'], // header row, single column
    columnItems              // content row, n columns
  ];

  // Create the columns block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
