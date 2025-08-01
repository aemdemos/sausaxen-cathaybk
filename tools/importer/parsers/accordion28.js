/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header: always one column, first row
  const headerRow = ['Accordion (accordion28)'];
  const rows = [headerRow];

  // Find the OL or UL with accordion items
  const collapseLists = element.querySelectorAll('ol.cubre-m-collapse, ul.cubre-m-collapse');
  let foundItems = false;

  collapseLists.forEach((collapseList) => {
    // Each item is a LI with class cubre-m-collapse__item
    const items = collapseList.querySelectorAll(':scope > li.cubre-m-collapse__item');
    items.forEach((item) => {
      // Title cell: .cubre-m-collapse__title > p[data-item-text] or fallback .cubre-m-collapse__title
      let titleCell = '';
      const titleLink = item.querySelector(':scope > a.cubre-m-collapse__title');
      if (titleLink) {
        const p = titleLink.querySelector('p[data-item-text]');
        titleCell = p || titleLink;
      }
      // Content cell: the collapsible content, inside .cubre-m-collapse__content
      let contentCell = '';
      const contentWrap = item.querySelector(':scope > .cubre-m-collapse__content');
      if (contentWrap) {
        // Try to grab the main content (often a single block), or all children if needed
        const mainBlock = contentWrap.querySelector(':scope > .cubre-o-block.-textInside') || contentWrap.querySelector(':scope > *');
        contentCell = mainBlock || contentWrap;
      }
      // Only add if title or content present
      if (titleCell || contentCell) {
        rows.push([titleCell, contentCell]);
        foundItems = true;
      }
    });
  });

  // Fallback: if no accordion found, try Q&A fallback structure
  if (!foundItems) {
    // Scan for Q&A like divs
    const pairs = element.querySelectorAll(':scope > div');
    pairs.forEach((pair) => {
      // Try to find question (e.g., a heading, or labeled class)
      let titleCell = pair.querySelector('h1,h2,h3,h4,.question,.faq-question');
      let contentCell = pair.querySelector('p,.answer,.faq-answer');
      if (!titleCell) {
        // fallback: maybe text node
        const firstChild = pair.firstElementChild;
        if (firstChild && firstChild.tagName.match(/^P|DIV|SPAN|B|STRONG|EM|I$/i)) {
          titleCell = firstChild;
        }
      }
      if (!contentCell) {
        // fallback: second child
        if (pair.children.length > 1) {
          contentCell = pair.children[1];
        }
      }
      if (titleCell || contentCell) {
        rows.push([titleCell || '', contentCell || '']);
        foundItems = true;
      }
    });
  }

  // Only create table if we have at least one item (header + one row)
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
