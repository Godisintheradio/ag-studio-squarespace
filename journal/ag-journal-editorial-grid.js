/* AG STUDIO — Journal Editorial Grid v2.9
   DOM-verified metadata and idempotent numbering, Basic Grid only.
*/
(function () {
  "use strict";
  const LIST = ".blog-list.blog-basic-grid";
  function decorate() {
    document.querySelectorAll(LIST).forEach(list => {
      const cards = Array.from(list.querySelectorAll("article.blog-item"))
        .filter(card => card.querySelector(".blog-basic-grid--text .blog-title"));
      cards.forEach((card, index) => {
        if (!card.classList.contains("ag-editorial-card")) {
          card.classList.add("ag-editorial-card");
        }
        const meta = card.querySelector(".blog-basic-grid--text .blog-meta-section");
        if (!meta) return;
        // Squarespace may emit uppercase author text: normalize the actual text.
        meta.querySelectorAll(".blog-author").forEach(author => {
          const normalized = author.textContent.trim().toLocaleLowerCase("it-IT")
            .replace(/(^|[\\s'’-])([\\p{L}])/gu, (_, separator, letter) =>
              separator + letter.toLocaleUpperCase("it-IT"));
          if (author.textContent !== normalized) author.textContent = normalized;
        });
        let number = card.querySelector(".ag-editorial-card__number");
        if (!number) {
          number = document.createElement("span");
          number.className = "ag-editorial-card__number";
          number.setAttribute("aria-hidden", "true");
        }
        if (number.parentElement !== meta) meta.appendChild(number);
        const label = String(index + 1).padStart(2, "0");
        if (number.textContent !== label) number.textContent = label;
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
      new MutationObserver(schedule).observe(root, {childList:true,subtree:true});
    }
    window.addEventListener("pageshow", schedule);
    document.addEventListener("mercury:load", schedule);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, {once:true});
  } else init();
})();
