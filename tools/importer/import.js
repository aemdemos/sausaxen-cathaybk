/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console */
import columns2Parser from './parsers/columns2.js';
import hero9Parser from './parsers/hero9.js';
import cards5Parser from './parsers/cards5.js';
import accordion15Parser from './parsers/accordion15.js';
import carousel13Parser from './parsers/carousel13.js';
import tabs6Parser from './parsers/tabs6.js';
import carousel16Parser from './parsers/carousel16.js';
import accordion19Parser from './parsers/accordion19.js';
import cards10Parser from './parsers/cards10.js';
import columns18Parser from './parsers/columns18.js';
import columns1Parser from './parsers/columns1.js';
import columns14Parser from './parsers/columns14.js';
import accordion22Parser from './parsers/accordion22.js';
import cards21Parser from './parsers/cards21.js';
import cards20Parser from './parsers/cards20.js';
import columns23Parser from './parsers/columns23.js';
import columns27Parser from './parsers/columns27.js';
import accordion28Parser from './parsers/accordion28.js';
import columns17Parser from './parsers/columns17.js';
import cards11Parser from './parsers/cards11.js';
import hero34Parser from './parsers/hero34.js';
import tableNoHeader26Parser from './parsers/tableNoHeader26.js';
import hero37Parser from './parsers/hero37.js';
import search8Parser from './parsers/search8.js';
import cards35Parser from './parsers/cards35.js';
import cards40Parser from './parsers/cards40.js';
import tabs25Parser from './parsers/tabs25.js';
import columns42Parser from './parsers/columns42.js';
import cards41Parser from './parsers/cards41.js';
import columns7Parser from './parsers/columns7.js';
import columns45Parser from './parsers/columns45.js';
import table43Parser from './parsers/table43.js';
import columns46Parser from './parsers/columns46.js';
import cardsNoImages47Parser from './parsers/cardsNoImages47.js';
import tableStriped32Parser from './parsers/tableStriped32.js';
import cards48Parser from './parsers/cards48.js';
import hero29Parser from './parsers/hero29.js';
import cards49Parser from './parsers/cards49.js';
import columns51Parser from './parsers/columns51.js';
import columns39Parser from './parsers/columns39.js';
import cards54Parser from './parsers/cards54.js';
import columns55Parser from './parsers/columns55.js';
import columns56Parser from './parsers/columns56.js';
import accordion58Parser from './parsers/accordion58.js';
import columns57Parser from './parsers/columns57.js';
import hero60Parser from './parsers/hero60.js';
import columns52Parser from './parsers/columns52.js';
import columns61Parser from './parsers/columns61.js';
import cards64Parser from './parsers/cards64.js';
import columns62Parser from './parsers/columns62.js';
import cards65Parser from './parsers/cards65.js';
import columns67Parser from './parsers/columns67.js';
import columns66Parser from './parsers/columns66.js';
import cards70Parser from './parsers/cards70.js';
import cards59Parser from './parsers/cards59.js';
import columns69Parser from './parsers/columns69.js';
import columns53Parser from './parsers/columns53.js';
import tabs72Parser from './parsers/tabs72.js';
import carousel74Parser from './parsers/carousel74.js';
import tabs24Parser from './parsers/tabs24.js';
import columns75Parser from './parsers/columns75.js';
import accordion79Parser from './parsers/accordion79.js';
import columns71Parser from './parsers/columns71.js';
import tabs50Parser from './parsers/tabs50.js';
import tableStriped44Parser from './parsers/tableStriped44.js';
import columns68Parser from './parsers/columns68.js';
import accordion84Parser from './parsers/accordion84.js';
import columns82Parser from './parsers/columns82.js';
import columns78Parser from './parsers/columns78.js';
import cards12Parser from './parsers/cards12.js';
import columns83Parser from './parsers/columns83.js';
import tabs77Parser from './parsers/tabs77.js';
import cards80Parser from './parsers/cards80.js';
import cards36Parser from './parsers/cards36.js';
import cards73Parser from './parsers/cards73.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import cleanupTransformer from './transformers/cleanup.js';
import imageTransformer from './transformers/images.js';
import linkTransformer from './transformers/links.js';
import sectionsTransformer from './transformers/sections.js';
import { TransformHook } from './transformers/transform.js';
import { customParsers, customTransformers, customElements } from './import.custom.js';
import {
  generateDocumentPath,
  handleOnLoad,
  mergeInventory,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  columns2: columns2Parser,
  hero9: hero9Parser,
  cards5: cards5Parser,
  accordion15: accordion15Parser,
  carousel13: carousel13Parser,
  tabs6: tabs6Parser,
  carousel16: carousel16Parser,
  accordion19: accordion19Parser,
  cards10: cards10Parser,
  columns18: columns18Parser,
  columns1: columns1Parser,
  columns14: columns14Parser,
  accordion22: accordion22Parser,
  cards21: cards21Parser,
  cards20: cards20Parser,
  columns23: columns23Parser,
  columns27: columns27Parser,
  accordion28: accordion28Parser,
  columns17: columns17Parser,
  cards11: cards11Parser,
  hero34: hero34Parser,
  tableNoHeader26: tableNoHeader26Parser,
  hero37: hero37Parser,
  search8: search8Parser,
  cards35: cards35Parser,
  cards40: cards40Parser,
  tabs25: tabs25Parser,
  columns42: columns42Parser,
  cards41: cards41Parser,
  columns7: columns7Parser,
  columns45: columns45Parser,
  table43: table43Parser,
  columns46: columns46Parser,
  cardsNoImages47: cardsNoImages47Parser,
  tableStriped32: tableStriped32Parser,
  cards48: cards48Parser,
  hero29: hero29Parser,
  cards49: cards49Parser,
  columns51: columns51Parser,
  columns39: columns39Parser,
  cards54: cards54Parser,
  columns55: columns55Parser,
  columns56: columns56Parser,
  accordion58: accordion58Parser,
  columns57: columns57Parser,
  hero60: hero60Parser,
  columns52: columns52Parser,
  columns61: columns61Parser,
  cards64: cards64Parser,
  columns62: columns62Parser,
  cards65: cards65Parser,
  columns67: columns67Parser,
  columns66: columns66Parser,
  cards70: cards70Parser,
  cards59: cards59Parser,
  columns69: columns69Parser,
  columns53: columns53Parser,
  tabs72: tabs72Parser,
  carousel74: carousel74Parser,
  tabs24: tabs24Parser,
  columns75: columns75Parser,
  accordion79: accordion79Parser,
  columns71: columns71Parser,
  tabs50: tabs50Parser,
  tableStriped44: tableStriped44Parser,
  columns68: columns68Parser,
  accordion84: accordion84Parser,
  columns82: columns82Parser,
  columns78: columns78Parser,
  cards12: cards12Parser,
  columns83: columns83Parser,
  tabs77: tabs77Parser,
  cards80: cards80Parser,
  cards36: cards36Parser,
  cards73: cards73Parser,
  ...customParsers,
};

const transformers = {
  cleanup: cleanupTransformer,
  images: imageTransformer,
  links: linkTransformer,
  sections: sectionsTransformer,
  ...customTransformers,
};

// Additional page elements to parse that are not included in the inventory
const pageElements = [{ name: 'metadata' }, ...customElements];

WebImporter.Import = {
  findSiteUrl: (instance, siteUrls) => (
    siteUrls.find(({ id }) => id === instance.urlHash)
  ),
  transform: (hookName, element, payload) => {
    // perform any additional transformations to the page
    Object.values(transformers).forEach((transformerFn) => (
      transformerFn.call(this, hookName, element, payload)
    ));
  },
  getParserName: ({ name, key }) => key || name,
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (
    { urls = [], fragments = [] },
    sourceUrl = '',
  ) => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => {
      // find url in urls array
      const siteUrl = WebImporter.Import.findSiteUrl(instance, urls);
      if (!siteUrl) {
        return false;
      }
      return siteUrl.url === sourceUrl;
    })
    .map(({ xpath }) => xpath)),
};

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { urls = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(inventory, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .flatMap((block) => block.instances
      .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
      .map((instance) => ({
        ...block,
        uuid: instance.uuid,
        section: instance.section,
        element: WebImporter.Import.getElementByXPath(document, instance.xpath),
      })))
    .filter((block) => block.element);

  const defaultContentElements = inventory.outliers
    .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
    .map((instance) => ({
      ...instance,
      element: WebImporter.Import.getElementByXPath(document, instance.xpath),
    }));

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // before page transform hook
  WebImporter.Import.transform(TransformHook.beforePageTransform, main, { ...source });

  // transform all elements using parsers
  [...defaultContentElements, ...blockElements, ...pageElements]
    // sort elements by order in the page
    .sort((a, b) => (a.uuid ? parseInt(a.uuid.split('-')[1], 10) - parseInt(b.uuid.split('-')[1], 10) : 999))
    // filter out fragment elements
    .filter((item) => !fragmentElements.includes(item.element))
    .forEach((item, idx, arr) => {
      const { element = main, ...pageBlock } = item;
      const parserName = WebImporter.Import.getParserName(pageBlock);
      const parserFn = parsers[parserName];
      try {
        let parserElement = element;
        if (typeof parserElement === 'string') {
          parserElement = main.querySelector(parserElement);
        }
        // before parse hook
        WebImporter.Import.transform(
          TransformHook.beforeParse,
          parserElement,
          {
            ...source,
            ...pageBlock,
            nextEl: arr[idx + 1],
          },
        );
        // parse the element
        if (parserFn) {
          parserFn.call(this, parserElement, { ...source });
        }
        // after parse hook
        WebImporter.Import.transform(
          TransformHook.afterParse,
          parserElement,
          {
            ...source,
            ...pageBlock,
          },
        );
      } catch (e) {
        console.warn(`Failed to parse block: ${parserName}`, e);
      }
    });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter((instance) => {
        const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
        if (!siteUrl) {
          return false;
        }
        return `${siteUrl.url}#${fragment.name}` === originalURL;
      })
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(({ instances }) => instances.find((instance) => {
            const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
            return `${siteUrl.url}#${fragment.name}` === originalURL && instance.xpath === xpath;
          }));

        if (!fragmentBlock) return;
        const parserName = WebImporter.Import.getParserName(fragmentBlock);
        const parserFn = parsers[parserName];
        if (!parserFn) return;
        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${fragmentBlock.key}, with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, params: { originalURL } } = source;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      const siteUrlsUrl = new URL('/tools/importer/site-urls.json', publishUrl);
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        // fetch and merge site-urls and inventory
        const siteUrlsResp = await fetch(siteUrlsUrl.href);
        const inventoryResp = await fetch(inventoryUrl.href);
        const siteUrls = await siteUrlsResp.json();
        inventory = await inventoryResp.json();
        inventory = mergeInventory(siteUrls, inventory, publishUrl);
      } catch (e) {
        console.error('Failed to merge site-urls and inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // before transform hook
    WebImporter.Import.transform(TransformHook.beforeTransform, main, { ...source, inventory });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source, inventory);
    }

    // after transform hook
    WebImporter.Import.transform(TransformHook.afterTransform, main, { ...source, inventory });

    return [{
      element: main,
      path,
    }];
  },
};
