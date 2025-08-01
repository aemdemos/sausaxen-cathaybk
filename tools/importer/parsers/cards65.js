/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct card items
  const items = element.querySelectorAll(':scope .cubre-o-iconEssay__item');
  const rows = [];
  // Header row, exactly as required
  rows.push(['Cards (cards65)']);
  items.forEach(item => {
    // First cell: image/icon
    const iconDiv = item.querySelector('.cubre-m-iconEssay__icon');
    const img = iconDiv ? iconDiv.querySelector('img') : null;

    // Second cell: text content
    const titleDiv = item.querySelector('.cubre-m-iconEssay__title');
    const descDiv = item.querySelector('.cubre-m-iconEssay__desc');
    // Compose text cell content in a fragment, preserving semantic meaning
    const contentFrag = document.createDocumentFragment();
    if (titleDiv) {
      // Use <strong> for bold, as per example
      const strong = document.createElement('strong');
      strong.textContent = titleDiv.textContent.trim();
      contentFrag.appendChild(strong);
      // Add <br> after heading
      contentFrag.appendChild(document.createElement('br'));
    }
    if (descDiv && descDiv.textContent.trim()) {
      // For visual separation according to example
      if (titleDiv) contentFrag.appendChild(document.createElement('br'));
      // Add description as plain text
      contentFrag.appendChild(document.createTextNode(descDiv.textContent.trim()));
    }
    rows.push([
      img,
      contentFrag
    ]);
  });
  // Create and replace table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
