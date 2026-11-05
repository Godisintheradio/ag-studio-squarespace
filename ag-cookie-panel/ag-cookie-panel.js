/**
 * AG Studio — Cookie UI IT/EN
 * Squarespace 7.1 native cookie banner + manage preferences dialog.
 * Text-only presentation enhancement: never touches consent or checkbox state.
 */
(() => {
  'use strict';

  const rootSelector = '.gdpr-cookie-banner, .manage-cookies-overlay';
  const labels = new Map([
    ['Manage Cookies', 'Gestisci i cookie / Manage Cookies'],
    ['Necessary', 'Necessari / Necessary'],
    ['Always on', 'Sempre attivi / Always on'],
    ['Performance and Analytics', 'Statistiche / Analytics'],
    ['Advertising', 'Pubblicità / Advertising'],
    ['Save Preferences', 'Salva preferenze / Save Preferences']
  ]);

  const descriptions = [
    {
      it: 'Questi cookie sono essenziali per il funzionamento del sito e per memorizzare le tue preferenze.',
      en: 'These cookies are essential for the website to function and remember your preferences.'
    },
    {
      it: 'Ci aiutano ad analizzare le visite e a migliorare le prestazioni e l’esperienza di navigazione.',
      en: 'These cookies help us analyze visits and improve website performance and browsing experience.'
    },
    {
      it: 'Sono utilizzati per misurare le campagne pubblicitarie e mostrare annunci pertinenti ai tuoi interessi.',
      en: 'These cookies help measure advertising campaigns and show ads relevant to your interests.'
    }
  ];

  const bannerCopy = [
    {
      title: 'IT — INFORMATIVA COOKIE',
      body: 'Utilizziamo cookie necessari al funzionamento del sito e, con il tuo consenso, cookie statistici e pubblicitari. Puoi accettarli, rifiutarli o gestire le tue preferenze.',
      link: 'Privacy Policy'
    },
    {
      title: 'EN — COOKIE NOTICE',
      body: 'We use essential cookies to operate this website and, with your consent, analytics and advertising cookies. You can accept, reject or manage your preferences.',
      link: 'Privacy Policy'
    }
  ];

  function updateIntro() {
    const banner = document.querySelector('section.gdpr-cookie-banner');
    if (!banner) return;
    const target = banner.querySelector('.disclaimer-text');
    if (!target || target.dataset.agCookieBilingual === 'true') return;

    const fragment = document.createDocumentFragment();
    for (const item of bannerCopy) {
      const group = document.createElement('div');
      group.className = 'ag-cookie-intro-lang';

      const heading = document.createElement('strong');
      heading.className = 'ag-cookie-intro-heading';
      heading.textContent = item.title;

      const paragraph = document.createElement('p');
      paragraph.append(document.createTextNode(item.body + ' '));
      const link = document.createElement('a');
      link.href = '/privacy-policy';
      link.textContent = item.link;
      paragraph.appendChild(link);

      group.append(heading, paragraph);
      fragment.appendChild(group);
    }
    target.replaceChildren(fragment);
    target.dataset.agCookieBilingual = 'true';
  }

  function updateDialog() {
    const panel = document.querySelector('.manage-cookies-overlay[role="dialog"]');
    if (!panel) return;

    for (const el of panel.querySelectorAll('.fs-unmask')) {
      const current = el.textContent.trim();
      if (labels.has(current)) el.textContent = labels.get(current);
    }

    panel.querySelectorAll('.category-description').forEach((el, index) => {
      const item = descriptions[index];
      if (!item || el.dataset.agCookieBilingual === 'true') return;
      const wrapper = document.createElement('span');
      wrapper.className = 'ag-cookie-languages';
      for (const [lang, text] of [['IT', item.it], ['EN', item.en]]) {
        const line = document.createElement('span');
        line.className = 'ag-cookie-language';
        const bold = document.createElement('strong');
        bold.textContent = lang + ' — ';
        line.append(bold, document.createTextNode(text));
        wrapper.append(line);
      }
      el.replaceChildren(wrapper);
      el.dataset.agCookieBilingual = 'true';
    });

    for (const el of panel.querySelectorAll('.toggle-wrapper > p')) {
      const current = el.textContent.trim();
      if (current === 'On') el.textContent = 'Attivo / On';
      if (current === 'Off') el.textContent = 'Disattivo / Off';
    }

    const close = panel.querySelector('button.close-icon');
    if (close && close.getAttribute('aria-label') === 'Close') {
      close.setAttribute('aria-label', 'Chiudi / Close');
    }
  }

  let pending = false;
  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      pending = false;
      updateIntro();
      updateDialog();
    });
  }

  function init() {
    schedule();
    // Squarespace mounts and updates both cookie surfaces dynamically.
    const observer = new MutationObserver(mutations => {
      if (mutations.some(m => {
        const element = m.target.nodeType === Node.ELEMENT_NODE ? m.target : m.target.parentElement;
        return (element && (element.matches?.(rootSelector) || element.closest?.(rootSelector))) ||
          [...m.addedNodes].some(n => n.nodeType === Node.ELEMENT_NODE &&
            (n.matches?.(rootSelector) || n.querySelector?.(rootSelector)));
      })) schedule();
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else init();
})();
