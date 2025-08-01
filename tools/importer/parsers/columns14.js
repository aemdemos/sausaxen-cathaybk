/* global WebImporter */
export default function parse(element, { document }) {
  // Find the footer container
  const footer = element.querySelector('.cubre-o-footer');
  if (!footer) return;

  // Extract left and right columns
  const linksContainer = footer.querySelector('.cubre-o-commonLinks.-footer') || document.createTextNode('');
  const copyrightContainer = footer.querySelector('.cubre-o-footer__copyright') || document.createTextNode('');

  // Create table
  const table = document.createElement('table');

  // Header row with colspan=2
  const headerTr = document.createElement('tr');
  const headerTh = document.createElement('th');
  headerTh.textContent = 'Columns (columns14)';
  headerTh.setAttribute('colspan', '2'); // ensure span
  headerTr.appendChild(headerTh);
  table.appendChild(headerTr);

  // Content row with two columns
  const contentTr = document.createElement('tr');
  const td1 = document.createElement('td');
  const td2 = document.createElement('td');
  td1.append(linksContainer);
  td2.append(copyrightContainer);
  contentTr.appendChild(td1);
  contentTr.appendChild(td2);
  table.appendChild(contentTr);

  element.replaceWith(table);
}
