/* AG STUDIO — Journal Table of Contents v1.2 */
(function () {
  "use strict";
  const CLASS = "ag-journal-toc";
  const MIN = 3;
  let observer;
  let pending = false;

  function update() {
    const root = document.querySelector(".blog-item-content.e-content, .blog-item-content");
    // Identify article pages by their own markup, not the archive layout.
    if (!root || !document.querySelector(".blog-item-top-wrapper")) return;

    // Exclude headings inside related articles, custom code and the TOC itself.
    const headings = Array.from(root.querySelectorAll("h2")).filter(h =>
      h.textContent.trim() &&
      !h.closest(".summary-v2-block, .sqs-block-code, .ag-journal-toc, aside, nav")
    );
    if (headings.length < MIN) return;

    const existing = root.querySelector("." + CLASS);
    const signature = headings.map(h => h.textContent.trim()).join("|");
    if (existing && existing.dataset.signature === signature) return;
    if (existing) existing.remove();

    const nav = document.createElement("nav");
    nav.className = CLASS;
    nav.setAttribute("aria-label", "Sommario dell'articolo");
    nav.dataset.signature = signature;

    const title = document.createElement("div");
    title.className = "ag-journal-toc__heading";
    title.textContent = "In questo articolo";
    nav.appendChild(title);

    const ol = document.createElement("ol");
    headings.forEach((h, index) => {
      if (!h.id) {
        const base = "ag-journal-section-" + (index + 1);
        let id = base, n = 2;
        while (document.getElementById(id)) id = base + "-" + n++;
        h.id = id;
      }
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#" + encodeURIComponent(h.id);
      a.textContent = h.textContent.trim();
      li.appendChild(a);
      ol.appendChild(li);
    });
    nav.appendChild(ol);

    const firstBlock = headings[0].closest(".sqs-block");
    // Squarespace text blocks sit inside .sqs-row > .sqs-col.
    // Insert as a sibling of the first H2's block to preserve the grid.
    if (firstBlock && root.contains(firstBlock)) {
      firstBlock.before(nav);
    } else {
      headings[0].before(nav);
    }
  }

  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      pending = false;
      update();
    });
  }
  function init() {
    update();
    observer = new MutationObserver(schedule);
    const root = document.querySelector(".blog-item-content") || document.body;
    observer.observe(root, { childList: true, subtree: true });
    window.addEventListener("pageshow", schedule);
    document.addEventListener("mercury:load", schedule);
    document.addEventListener("DOMContentLoaded", schedule);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, {once: true});
  } else {
    init();
  }
})();
