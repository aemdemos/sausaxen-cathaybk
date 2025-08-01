/* global WebImporter */
export default function parse(element, { document }) {
  // Find the slider wrapper containing the columns
  const slider = element.querySelector('.cubre-m-linkGroup__slider, .swiper');
  if (!slider) return;

  // Get all the column items
  const items = slider.querySelectorAll('.cubre-m-linkGroup__item');
  if (!items.length) return;

  // Collect columns as elements for the second row
  const columns = [];
  items.forEach((item) => {
    // Grab the immediate .cubre-m-simpleGraphic element as the cell content
    const graphic = item.querySelector(':scope > .cubre-m-simpleGraphic');
    if (graphic) {
      columns.push(graphic);
    } else {
      columns.push(item);
    }
  });

  // Build the table: header row is a single column, content row has N columns
  const rows = [
    ['Columns (columns18)'],
    columns
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
