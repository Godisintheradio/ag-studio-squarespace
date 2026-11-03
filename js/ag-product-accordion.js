/* AG STUDIO — PRODUCT ACCORDION v0.1 */
(function () {
  "use strict";

  if (window.__agProductAccordion) return;
  window.__agProductAccordion = true;

  function init() {
    // Solo schede prodotto del Code Shop
    if (!location.pathname.startsWith("/code-shop/p/")) return;

    // Non modificare l'editor Squarespace
    if (
      document.body.classList.contains("sqs-edit-mode") ||
      document.body.classList.contains("sqs-edit-mode-active")
    ) return;

    const description = document.querySelector(
      "main .product-meta .product-description"
    );

    if (!description) return;

    // Gli H3 devono essere figli diretti della descrizione
    const headings = Array.from(description.children)
      .filter(el => el.tagName === "H3");

    if (!headings.length) return;

    const accordion = document.createElement("div");
    accordion.className = "ag-product-accordion";

    headings.forEach(heading => {
      const details = document.createElement("details");
      details.className = "ag-product-accordion__item";

      const summary = document.createElement("summary");
      summary.textContent = heading.textContent.trim();

      const content = document.createElement("div");
      content.className = "ag-product-accordion__content";

      // Raccoglie il contenuto fino al prossimo H3
      let sibling = heading.nextSibling;

      while (sibling) {
        if (
          sibling.nodeType === 1 &&
          sibling.tagName === "H3"
        ) break;

        const next = sibling.nextSibling;
        content.appendChild(sibling);
        sibling = next;
      }

      details.append(summary, content);
      accordion.appendChild(details);
      heading.remove();
    });

    description.appendChild(accordion);

    // Mantiene aperto un solo pannello per volta
    accordion.addEventListener("toggle", event => {
      const active = event.target;

      if (
        active.tagName !== "DETAILS" ||
        !active.open
      ) return;

      accordion.querySelectorAll("details[open]")
        .forEach(item => {
          if (item !== active) item.open = false;
        });
    }, true);
  }

  function schedule() {
    clearTimeout(schedule.timer);
    schedule.timer = setTimeout(init, 150);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, {
      once: true
    });
  } else {
    init();
  }

  document.addEventListener("mercury:load", schedule);
  document.addEventListener("sqs:page-loaded", schedule);
  window.addEventListener("popstate", schedule);
})();
