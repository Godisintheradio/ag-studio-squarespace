/* AG STUDIO — Journal Editorial Grid v2.4
   Non-destructive progressive enhancement for Squarespace 7.1 Basic Grid.
*/
(function () {
  "use strict";
  const LIST = ".blog-list.blog-basic-grid";
  const CARD = "ag-editorial-card";
  let scheduled = false;

  function decorate() {
    document.querySelectorAll(LIST).forEach(list => {
      const cards = Array.from(list.querySelectorAll(".blog-item")).filter(card =>
        card.querySelector(".blog-title") &&
        card.querySelector(".blog-basic-grid--text")
      );
      cards.forEach((card, index) => {
        if (!card.classList.contains(CARD)) card.classList.add(CARD);
        let number = Array.from(card.children).find(el =>
          el.classList.contains("ag-editorial-card__number")
        );
        if (!number) {
          number = document.createElement("span");
          number.className = "ag-editorial-card__number";
          number.setAttribute("aria-hidden", "true");
          card.appendChild(number);
        }
        const label = String(index + 1).padStart(2, "0");
        if (number.textContent !== label) number.textContent = label;
        const meta = card.querySelector(".blog-meta");
        if (meta && meta.dataset.agEditorialNumber !== label) {
          meta.dataset.agEditorialNumber = label;
        }
      });
    });
  }
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
    if (root) new MutationObserver(schedule).observe(root, { childList:true, subtree:true });
    window.addEventListener("pageshow", schedule);
    document.addEventListener("mercury:load", schedule);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, {once:true});
  } else {
    init();
  }
})();
