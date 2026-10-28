/* AG STUDIO — Journal Editorial Grid v2.0
   Progressive enhancement: never modifies article pages or native card content.
*/
(function () {
  "use strict";
  const LIST = ".blog-list.blog-basic-grid";
  const CARD = "ag-editorial-card";

  function decorate() {
    document.querySelectorAll(LIST).forEach(list => {
      // An article is a card only when it contains a blog listing title.
      const candidates = Array.from(list.querySelectorAll(".blog-title"));
      const cards = [];
      const seen = new Set();
      candidates.forEach(title => {
        const card = title.closest("article.blog-item, .blog-item, article");
        if (!card || !list.contains(card) || seen.has(card)) return;
        seen.add(card);
        cards.push(card);
      });
      cards.forEach((card, index) => {
        card.classList.add(CARD);
        let number = card.querySelector(":scope > .ag-editorial-card__number");
        if (!number) {
          number = document.createElement("span");
          number.className = "ag-editorial-card__number";
          number.setAttribute("aria-hidden", "true");
          card.appendChild(number);
        }
        number.textContent = String(index + 1).padStart(2, "0");
      });
    });
  }

  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      decorate();
    });
  }

  function init() {
    decorate();
    const root = document.querySelector(LIST);
    if (root) {
      const observer = new MutationObserver(schedule);
      observer.observe(root, { childList: true, subtree: true });
    }
    window.addEventListener("pageshow", schedule);
    document.addEventListener("mercury:load", schedule);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
