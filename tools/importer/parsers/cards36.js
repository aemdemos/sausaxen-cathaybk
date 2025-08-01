/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: is node visible and not part of a popup/modal
  function isVisible(node) {
    let el = node;
    while (el && el !== element) {
      if (el.classList && (el.classList.contains('cubre-m-popup') || el.classList.contains('mfp-hide'))) {
        return false;
      }
      el = el.parentElement;
    }
    return true;
  }

  // Helper: get main visible image in card
  function getImg(card) {
    const pic = card.querySelector('.cubre-m-puzzle__pic');
    if (!pic) return '';
    const img = pic.querySelector('img.cubre-m-puzzle__img.-pc') ||
      pic.querySelector('img.cubre-m-puzzle__img.-mb') ||
      pic.querySelector('img');
    return img || '';
  }

  // Helper: add elements to frag if they are visible
  function appendIfVisible(frag, nodes) {
    nodes.forEach(n => {
      if (isVisible(n)) frag.appendChild(n);
    });
  }

  // Compose table rows
  const rows = [['Cards (cards36)']];
  // Find all relevant cards in order
  let cards = Array.from(element.querySelectorAll('.cubre-m-puzzle'));
  cards = cards.filter(isVisible);

  cards.forEach(card => {
    const img = getImg(card);
    // Content cell
    const frag = document.createDocumentFragment();

    // Title (strong)
    const title = card.querySelector('.cubre-m-puzzle__title');
    if (title && title.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      frag.appendChild(strong);
    }

    // Description: all .cubre-o-textContent (visible, not in popup, direct children of .cubre-m-puzzle__text or nearby)
    const descs = Array.from(card.querySelectorAll('.cubre-o-textContent'))
      .filter(isVisible)
      // Exclude those inside popup/modal
      .filter(d => {
        let el = d.parentElement;
        while (el && el !== card) {
          if (el.classList && el.classList.contains('cubre-m-popup')) return false;
          el = el.parentElement;
        }
        return true;
      });
    descs.forEach(desc => {
      // Append all child nodes (so we get <p>, <div>, text, etc.)
      Array.from(desc.childNodes).forEach(child => {
        frag.appendChild(child);
      });
    });

    // Steps/ordered lists: all visible <ol> not in popup
    Array.from(card.querySelectorAll('ol'))
      .filter(isVisible)
      .filter(ol => {
        let el = ol.parentElement;
        while (el && el !== card) {
          if (el.classList && el.classList.contains('cubre-m-popup')) return false;
          el = el.parentElement;
        }
        return true;
      })
      .forEach(ol => frag.appendChild(ol));

    // Content tables: .cubre-o-block.-textInside (visible, not in popup)
    Array.from(card.querySelectorAll('.cubre-o-block.-textInside'))
      .filter(isVisible)
      .forEach(block => {
        // Header: <p> in .cubre-o-block__title
        const pTitle = block.querySelector('.cubre-o-block__title p');
        if (pTitle) {
          const headerDiv = document.createElement('div');
          headerDiv.innerHTML = pTitle.innerHTML;
          frag.appendChild(headerDiv);
        }
        // Table(s): .cubre-m-scrollTable__head table
        Array.from(block.querySelectorAll('.cubre-m-scrollTable__head table')).forEach(table => {
          frag.appendChild(table);
        });
      });

    // Text blocks with lists: .cubre-o-block__component.-text (visible, not in popup)
    Array.from(card.querySelectorAll('.cubre-o-block__component.-text'))
      .filter(isVisible)
      .forEach(block => {
        frag.appendChild(block);
      });

    // Find all visible CTA links that are direct children of .cubre-m-puzzle__link, or .cubre-a-iconLink.-sub, and are not for popups
    // Only reference, don't clone
    const ctaLinks = [];
    const mainCta = card.querySelector('.cubre-m-puzzle__link .cubre-a-iconLink');
    if (mainCta && isVisible(mainCta)) ctaLinks.push(mainCta);
    Array.from(card.querySelectorAll('a.cubre-a-iconLink.-sub'))
      .filter(isVisible)
      .forEach(link => ctaLinks.push(link));
    ctaLinks.forEach(link => {
      frag.appendChild(document.createElement('br'));
      frag.appendChild(link);
    });

    // Add row to table
    rows.push([img, frag]);
  });

  // Create and replace table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
