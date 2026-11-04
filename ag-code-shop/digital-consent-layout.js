/**
 * AG Studio — Code Shop / Bilingual Digital Consent
 * Squarespace 7.1 Add-to-Cart lightbox.
 * Display-only: does not change checkbox state, form values or validation.
 */
(() => {
  'use strict';

  const FIELD_ID = 'checkbox-10fb1c3e-f9a1-4790-9b9c-643329839277';

  function formatConsent() {
    const field = document.getElementById(FIELD_ID);
    if (!field) return;

    const description = field.querySelector('legend p.description');
    if (!description || description.dataset.agConsentFormatted === 'true') return;

    const raw = description.textContent.trim();
    const match = raw.match(/^EN\s*[-–—]\s*([\s\S]*?)\s+IT\s*[-–—]\s*([\s\S]*)$/i);
    if (!match) return;

    const en = document.createElement('span');
    en.className = 'ag-consent-lang ag-consent-lang--en';
    en.textContent = 'EN — ' + match[1].trim();

    const it = document.createElement('span');
    it.className = 'ag-consent-lang ag-consent-lang--it';
    it.textContent = 'IT — ' + match[2].trim();

    description.replaceChildren(en, it);
    description.dataset.agConsentFormatted = 'true';
  }

  let pending = false;
  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      pending = false;
      formatConsent();
    });
  }

  function init() {
    formatConsent();
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
