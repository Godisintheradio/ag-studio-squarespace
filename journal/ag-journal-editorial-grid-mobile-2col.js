/* AG STUDIO — Journal Mobile 2 Columns / Expandable excerpt v1.1
   Companion to optional 2-column mobile CSS. Works only within Basic Grid cards.
*/
(function () {
  "use strict";
  const LIST = ".blog-list.blog-basic-grid";
  const CARD = "article.blog-item.ag-editorial-card";
  const BTN = "ag-mobile-excerpt-toggle";
  let queued = false;
  let nextId = 0;

  function enhance() {
    document.querySelectorAll(LIST).forEach(list => {
      list.querySelectorAll(CARD).forEach(card => {
        const title = card.querySelector(".blog-basic-grid--text h1.blog-title");
        const excerpt = card.querySelector(".blog-basic-grid--text .blog-excerpt");
        if (!title || !excerpt || !excerpt.textContent.trim()) return;
        let button = card.querySelector("." + BTN);
        if (button) return;
        button = document.createElement("button");
        button.type = "button";
        button.className = BTN;
        button.textContent = "Leggi estratto";
        button.setAttribute("aria-expanded", "false");
        if (!excerpt.id) excerpt.id = "ag-mobile-excerpt-" + (++nextId);
        button.setAttribute("aria-controls", excerpt.id);
        title.insertAdjacentElement("afterend", button);
      });
    });
  }

  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; enhance(); });
  }

  document.addEventListener("click", event => {
    const button = event.target.closest("button." + BTN);
    if (!button) return;
    const card = button.closest(CARD);
    if (!card) return;
    const open = !card.classList.contains("ag-mobile-excerpt-open");
    card.classList.toggle("ag-mobile-excerpt-open", open);
    button.setAttribute("aria-expanded", String(open));
    button.firstChild.textContent = open ? "Chiudi estratto" : "Leggi estratto";
  });

  function init() {
    enhance();
    const list = document.querySelector(LIST);
    if (list) {
      const observer = new MutationObserver(schedule);
      observer.observe(list, { childList: true, subtree: true });
    }
    window.addEventListener("pageshow", schedule);
    document.addEventListener("mercury:load", schedule);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else init();
})();
