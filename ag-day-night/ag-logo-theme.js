/* AG Studio — Global Day/Night Logo v1.0 (Squarespace 7.1)
 * Dark mode source of truth: html[data-ag-theme="dark"]
 * Header logo only; mobile drawer already uses the dark brand image.
 */
(function () {
  'use strict';
  if (window.__AG_LOGO_THEME__) return;
  window.__AG_LOGO_THEME__ = true;

  const DARK_LOGO = 'https://static1.squarespace.com/static/5b6476223917eeb605c563f4/t/6ae320f38d4e95758258b329/1793270003136/Brand-AG-dark.png';
  const original = new WeakMap();
  const headerSelector = 'header#header, header.Header, header.header, .header';
  const logoSelector = '.header-title-logo img, .header-title img, .header-branding img';
  let queued = false;

  function isDark() {
    return document.documentElement.getAttribute('data-ag-theme') === 'dark';
  }

  function update() {
    queued = false;
    const header = document.querySelector(headerSelector);
    const logo = header && header.querySelector(logoSelector);
    if (!logo) return;

    if (!original.has(logo)) {
      original.set(logo, {
        src: logo.getAttribute('src'),
        srcset: logo.getAttribute('srcset'),
        sizes: logo.getAttribute('sizes')
      });
    }
    const saved = original.get(logo);
    const dark = isDark();
    if (logo.dataset.agLogoMode === (dark ? 'dark' : 'light')) return;

    if (dark) {
      logo.removeAttribute('srcset');
      logo.removeAttribute('sizes');
      logo.setAttribute('src', DARK_LOGO);
    } else {
      for (const attr of ['src', 'srcset', 'sizes']) {
        if (saved[attr] === null) logo.removeAttribute(attr);
        else logo.setAttribute(attr, saved[attr]);
      }
    }
    logo.dataset.agLogoMode = dark ? 'dark' : 'light';
  }

  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  }

  function init() {
    schedule();
    new MutationObserver(schedule).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-ag-theme']
    });
    const header = document.querySelector(headerSelector);
    if (header) {
      new MutationObserver(schedule).observe(header, { childList: true, subtree: true });
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else init();
})();
