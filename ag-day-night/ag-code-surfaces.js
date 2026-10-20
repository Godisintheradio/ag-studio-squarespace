/* AG Studio | Code Block surfaces 0.1.0 */
(function () {
  'use strict';
  if (window.__AG_CODE_SURFACES__) return;
  window.__AG_CODE_SURFACES__ = true;
  const surfaces = '.sqs-block-code .sqs-block-content';
  const allowed = 'div,section,article,main,aside,header,footer';
  const skip = 'button,a,input,select,textarea,svg,canvas,video,iframe,picture,img,[data-ag-theme-ignore],.ag-theme-ignore';
  function solidWhite(value) {
    const match = value.match(/^rgba?\(\s*(\d+)[, ]+\s*(\d+)[, ]+\s*(\d+)(?:[, /]+([\d.]+))?\s*\)$/i);
    return !!match && +match[1] >= 248 && +match[2] >= 248 && +match[3] >= 248 && (match[4] === undefined || +match[4] >= 0.98);
  }
  function scan() {
    document.querySelectorAll(surfaces).forEach(content => {
      const elements = [content, ...content.querySelectorAll(allowed)];
      for (const el of elements) {
        if (el.matches(skip) || el.closest('[data-ag-theme-ignore],.ag-theme-ignore')) continue;
        if (el.classList.contains('ag-code-white-surface')) continue;
        const style = getComputedStyle(el);
        if (style.backgroundImage !== 'none') continue;
        if (solidWhite(style.backgroundColor)) el.classList.add('ag-code-white-surface');
      }
    });
  }
  function init() {
    scan();
    const observer = new MutationObserver(mutations => {
      if (mutations.some(m => [...m.addedNodes].some(n => n.nodeType === 1))) scan();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
