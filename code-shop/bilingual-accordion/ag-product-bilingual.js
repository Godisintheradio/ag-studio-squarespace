/* AG Studio — Product Bilingual Accordion v0.6 TEST
   Sostituisce il vecchio Product Accordion e gli switcher precedenti.
   Formato nella descrizione: H2 titolo inglese, H3..., H2 titolo italiano, H3...
*/
(function () {
  'use strict';
  if (window.__agProductBilingualV06) return;
  window.__agProductBilingualV06 = true;

  const KEY = 'ag:code-shop:language';
  const ROOT = 'main .product-description';
  let currentLanguage = null;
  let timer;

  const normalize = s => (s || '').replace(/\s+/g, ' ').trim().toLowerCase();

  function preference() {
    if (currentLanguage) return currentLanguage;
    try {
      const stored = sessionStorage.getItem(KEY);
      if (stored === 'en' || stored === 'it') return stored;
    } catch (_) {}
    return 'en';
  }

  function switchLanguage(language) {
    currentLanguage = language;
    try { sessionStorage.setItem(KEY, language); } catch (_) {}
    document.querySelectorAll('[data-ag-product-languages]').forEach(widget => {
      widget.querySelectorAll('[data-ag-language-panel]').forEach(panel => {
        panel.hidden = panel.dataset.agLanguagePanel !== language;
      });
      widget.querySelectorAll('[data-ag-language-button]').forEach(button => {
        button.setAttribute('aria-pressed', String(button.dataset.agLanguageButton === language));
      });
    });
  }

  // Unwrap every container that contains an H2/H3 marker.
  // In Squarespace, rich-text headings may be nested in wrappers other than DIV/P.
  // This prevents the "Italiano" H2 from being swallowed by the last English H3.
  function flatten(nodes, output) {
    Array.from(nodes).forEach(node => {
      if (node.nodeType !== 1) {
        output.push(node);
        return;
      }
      if (node.matches('h2, h3')) {
        output.push(node);
        return;
      }
      if (node.querySelector('h2, h3')) {
        flatten(node.childNodes, output);
        return;
      }
      output.push(node);
    });
  }

  function accordionFor(nodes) {
    const panel = document.createElement('div');
    panel.className = 'ag-product-languages__content';
    let accordion = null;
    let contents = null;

    nodes.forEach(node => {
      if (node.nodeType === 1 && node.tagName === 'H3') {
        if (!accordion) {
          accordion = document.createElement('div');
          accordion.className = 'ag-product-accordion';
          panel.appendChild(accordion);
          accordion.addEventListener('toggle', event => {
            const current = event.target;
            if (!(current instanceof HTMLDetailsElement) || !current.open) return;
            accordion.querySelectorAll('details[open]').forEach(other => {
              if (other !== current) other.open = false;
            });
          }, true);
        }
        const details = document.createElement('details');
        details.className = 'ag-product-accordion__item';
        const summary = document.createElement('summary');
        summary.textContent = node.textContent.trim();
        contents = document.createElement('div');
        contents.className = 'ag-product-accordion__content';
        details.append(summary, contents);
        accordion.appendChild(details);
      } else if (contents) {
        contents.appendChild(node);
      } else {
        panel.appendChild(node);
      }
    });
    return panel;
  }

  function convert(description) {
    if (description.dataset.agBilingualReady === 'true') return;

    const nodes = [];
    flatten(description.childNodes, nodes);
    // I primi due H2 sono i titoli reali delle descrizioni, non etichette di lingua.
    const h2 = nodes.map((node, index) => ({ node, index }))
      .filter(item => item.node.nodeType === 1 && item.node.tagName === 'H2');
    if (h2.length !== 2) return;
    const [en, it] = h2;
    const enNodes = nodes.slice(en.index + 1, it.index);
    const itNodes = nodes.slice(it.index + 1);
    if (!enNodes.length || !itNodes.length) return;

    const widget = document.createElement('div');
    widget.className = 'ag-product-languages';
    widget.dataset.agProductLanguages = '';
    const buttons = document.createElement('div');
    buttons.className = 'ag-product-languages__controls';
    buttons.setAttribute('role', 'group');
    buttons.setAttribute('aria-label', 'Product description language');
    [['en', 'EN'], ['it', 'IT']].forEach(([language, label]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'ag-product-languages__button';
      button.dataset.agLanguageButton = language;
      button.textContent = label;
      button.addEventListener('click', () => switchLanguage(language));
      buttons.appendChild(button);
    });
    widget.appendChild(buttons);

    [['en', enNodes], ['it', itNodes]].forEach(([lang, group]) => {
      const panel = document.createElement('div');
      panel.className = 'ag-product-languages__panel';
      panel.dataset.agLanguagePanel = lang;
      panel.lang = lang;
      panel.appendChild(accordionFor(group));
      widget.appendChild(panel);
    });

    // Preserve any content placed above the English heading.
    const prefix = nodes.slice(0, en.index);
    description.replaceChildren(...prefix, widget);
    description.dataset.agBilingualReady = 'true';
    switchLanguage(preference());
  }

  function init() {
    if (!location.pathname.startsWith('/code-shop/p/')) return;
    if (document.body.classList.contains('sqs-edit-mode') ||
        document.body.classList.contains('sqs-edit-mode-active')) return;
    // Squarespace può utilizzare descrizioni separate per desktop e mobile.
    // Elaboriamo tutte le descrizioni, non solo la prima nel DOM.
    document.querySelectorAll(ROOT).forEach(convert);
  }

  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(init, 150);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else init();
  document.addEventListener('mercury:load', schedule);
  document.addEventListener('sqs:page-loaded', schedule);
  window.addEventListener('pageshow', schedule);
  window.addEventListener('popstate', schedule);
})();
