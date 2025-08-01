/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get the wrap container
  const wrap = element.querySelector('.cubre-m-footer__wrap');
  if (!wrap) return;
  const footer = wrap.querySelector('.cubre-o-footer');
  if (!footer) return;

  // Get left column: .cubre-o-footer__related > .cubre-o-commonLinks
  let leftCell = null;
  const related = footer.querySelector('.cubre-o-footer__related');
  if (related) {
    const commonLinks = related.querySelector('.cubre-o-commonLinks');
    if (commonLinks) leftCell = commonLinks;
  }

  // Get right column: .cubre-o-footer__social > .cubre-o-social
  let rightCell = null;
  const socialSection = footer.querySelector('.cubre-o-footer__social');
  if (socialSection) {
    const social = socialSection.querySelector('.cubre-o-social');
    if (social) rightCell = social;
  }

  // Build the correct cells array: header is one column, next row is two columns
  const cells = [
    ['Columns (columns56)'],     // header: one column only
    [leftCell, rightCell]        // content: two columns
  ];

  // Create the table and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
