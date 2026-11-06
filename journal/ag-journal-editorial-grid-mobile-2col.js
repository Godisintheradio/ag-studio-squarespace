/* AG STUDIO — Journal Mobile 2 Columns / Excerpts + masonry v1.5
   Uses explicit grid spans to pack the two independent mobile columns.
   Does not change the DOM order, card images or the desktop layout.
*/
(function () {
  "use strict";
  const LIST = ".blog-list.blog-basic-grid";
  const CARD = "article.blog-item.ag-editorial-card";
  const BTN = "ag-mobile-excerpt-toggle";
  const MOBILE = window.matchMedia("(min-width: 360px) and (max-width: 767px)");
  const ROW = 1;
  const GAP = 8;
  const watched = new WeakSet();
  let queued = false;
  let nextId = 0;
  let resizeObserver = null;

  function getCards(list) {
    return Array.from(list.querySelectorAll(":scope > " + CARD));
  }

  function enhance(list) {
    getCards(list).forEach(card => {
      const title = card.querySelector(".blog-basic-grid--text h1.blog-title");
      const excerpt = card.querySelector(".blog-basic-grid--text .blog-excerpt");
      if (title && excerpt && excerpt.textContent.trim() && !card.querySelector("." + BTN)) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = BTN;
        button.textContent = "Leggi estratto";
        button.setAttribute("aria-expanded", "false");
        if (!excerpt.id) excerpt.id = "ag-mobile-excerpt-" + (++nextId);
        button.setAttribute("aria-controls", excerpt.id);
        title.insertAdjacentElement("afterend", button);
      }
      if (resizeObserver && !watched.has(card)) {
        watched.add(card);
        resizeObserver.observe(card);
      }
    });
  }

  // Fit long titles to the same reading area; never truncate content.
  // If a title cannot fit at 13px, its box grows naturally.
  function fitTitles(list) {
    getCards(list).forEach(card => {
      const title = card.querySelector(".blog-basic-grid--text > h1.blog-title");
      if (!title) return;
      if (!MOBILE.matches) {
        if (title.style.fontSize) title.style.removeProperty("font-size");
        return;
      }
      const steps = [16, 15.5, 15, 14.5, 14, 13.5, 13];
      for (const size of steps) {
        const value = size + "px";
        if (title.style.fontSize !== value) {
          title.style.setProperty("font-size", value, "important");
        }
        if (title.scrollHeight <= 97) break;
      }
    });
  }

  function layout(list) {
    const cards = getCards(list);
    if (!MOBILE.matches) {
      cards.forEach(card => {
        if (card.style.gridRow) card.style.removeProperty("grid-row");
        if (card.style.gridColumn) card.style.removeProperty("grid-column");
      });
      return;
    }
    // Each column tracks its own next free row. A tall expanded excerpt
    // therefore does not create empty space under the opposite card.
    const nextRow = [1, 1];
    cards.forEach((card, index) => {
      const col = index % 2;
      const height = card.getBoundingClientRect().height;
      const span = Math.max(1, Math.ceil((height + GAP) / (ROW + GAP)));
      const placement = nextRow[col] + " / span " + span;
      const column = String(col + 1);
      if (card.style.gridRow !== placement) card.style.gridRow = placement;
      if (card.style.gridColumn !== column) card.style.gridColumn = column;
      nextRow[col] += span;
    });
  }

  function refresh() {
    document.querySelectorAll(LIST).forEach(list => {
      enhance(list);
      fitTitles(list);
      layout(list);
    });
  }

  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      refresh();
    });
  }

  document.addEventListener("click", event => {
    const button = event.target.closest("button." + BTN);
    if (!button) return;
    const card = button.closest(CARD);
    if (!card) return;
    const open = !card.classList.contains("ag-mobile-excerpt-open");
    card.classList.toggle("ag-mobile-excerpt-open", open);
    button.setAttribute("aria-expanded", String(open));
    button.textContent = open ? "Chiudi estratto" : "Leggi estratto";
    schedule();
  });

  function init() {
    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(schedule);
    }
    refresh();
    document.querySelectorAll(LIST).forEach(list => {
      // Child additions cover pagination and Squarespace dynamic navigation.
      new MutationObserver(schedule).observe(list, {childList:true, subtree:true});
    });
    MOBILE.addEventListener("change", schedule);
    window.addEventListener("resize", schedule);
    window.addEventListener("pageshow", schedule);
    document.addEventListener("mercury:load", schedule);
    document.addEventListener("load", event => {
      if (event.target instanceof HTMLImageElement) schedule();
    }, true);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, {once:true});
  } else init();
})();
