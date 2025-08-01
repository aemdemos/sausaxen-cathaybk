/* global WebImporter */
export default function parse(element, { document }) {
  // Find the inner wrap that contains all relevant columns content
  const wrap = element.querySelector('.cubre-o-block__wrap');
  if (!wrap) return;

  // The key component is inside .cubre-o-block__component > .cubre-m-appDownload
  const component = wrap.querySelector('.cubre-o-block__component .cubre-m-appDownload');
  if (!component) return;

  // The main content is in .cubre-m-appDownload__wrap
  const mainWrap = component.querySelector('.cubre-m-appDownload__wrap');
  if (!mainWrap) return;

  // The left column includes: pic, content, and button
  const leftCell = [];
  // Pic (image)
  const pic = mainWrap.querySelector('.cubre-m-appDownload__pic');
  if (pic) leftCell.push(pic);
  // Content (title + text steps)
  const content = mainWrap.querySelector('.cubre-m-appDownload__content');
  if (content) leftCell.push(content);
  // Button
  const btn = mainWrap.querySelector('.cubre-m-appDownload__btn');
  if (btn) leftCell.push(btn);

  // The right column contains QR codes
  const code = mainWrap.querySelector('.cubre-m-appDownload__code');
  const rightCell = [];
  if (code) {
    // Each .cubre-m-qrCode inside is a QR+logo+link block
    const qrBlocks = Array.from(code.querySelectorAll('.cubre-m-qrCode'));
    // Reference, not clone
    rightCell.push(...qrBlocks);
  }

  // Create block table
  const cells = [
    ['Columns (columns75)'],
    [leftCell, rightCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
