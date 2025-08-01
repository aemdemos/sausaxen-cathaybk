/* global WebImporter */
export default function parse(element, { document }) {
  // The header row for columns block
  const headerRow = ['Columns (columns61)'];

  // Find all column items
  const items = element.querySelectorAll('.cubre-o-graphic__item');
  
  // For each column, collect its image and data content
  const columns = Array.from(items).map((item) => {
    const fragments = [];
    // Get the image, if present
    const pic = item.querySelector('.cubre-m-simpleGraphic__pic');
    if (pic) fragments.push(pic);
    // Get the data block, if present (including title, text, links)
    const data = item.querySelector('.cubre-m-simpleGraphic__data');
    if (data) fragments.push(data);
    if (fragments.length === 1) return fragments[0];
    if (fragments.length > 1) return fragments;
    return '';
  });

  // Compose the table as specified
  const cells = [headerRow, columns];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
