/* AG STUDIO — Journal Table of Contents v1.0
   Automatically builds a summary from headings in Squarespace blog posts.
*/
(function () {
  "use strict";
  const TOC_CLASS = "ag-journal-toc";
  const HEADING_ID_PREFIX = "ag-journal-section-";
  const MIN_HEADINGS = 3;

  function isArticle() {
    return document.body.classList.contains("collection-type-blog-masonry") &&
      document.body.classList.contains("view-item");
  }
  function getHeadings(root) {
    return Array.from(root.querySelectorAll("h2")).filter(function (heading) {
      return heading.textContent.trim() &&
        !heading.closest(".summary-v2-block, .ag-journal-toc, .sqs-block-code, .sqs-block-html, nav, aside");
    });
  }
  function makeId(heading, index) {
    if (heading.id) return heading.id;
    let id = HEADING_ID_PREFIX + (index + 1);
    let suffix = 2;
    while (document.getElementById(id)) id = HEADING_ID_PREFIX + (index + 1) + "-" + suffix++;
    heading.id = id;
    return id;
  }
  function build() {
    if (!isArticle()) return;
    const root = document.querySelector(".blog-item-content");
    if (!root) return;
    const headings = getHeadings(root);
    const old = root.querySelector("." + TOC_CLASS);
    if (old) old.remove();
    if (headings.length < MIN_HEADINGS) return;

    const nav = document.createElement("nav");
    nav.className = TOC_CLASS;
    nav.setAttribute("aria-label", "Sommario dell'articolo");

    const label = document.createElement("div");
    label.className = "ag-journal-toc__heading";
    label.textContent = "In questo articolo";
    nav.appendChild(label);

    const list = document.createElement("ol");
    headings.forEach(function (heading, index) {
      const li = document.createElement("li");
      const link = document.createElement("a");
      const id = makeId(heading, index);
      link.href = "#" + encodeURIComponent(id);
      link.textContent = heading.textContent.trim();
      li.appendChild(link);
      list.appendChild(li);
    });
    nav.appendChild(list);

    // Insert before first section, after the post's introduction.
    const first = headings[0];
    const block = first.closest(".sqs-block");
    if (block && root.contains(block)) {
      block.parentNode.insertBefore(nav, block);
    } else {
      first.parentNode.insertBefore(nav, first);
    }
  }
  function start() {
    build();
    window.addEventListener("pageshow", build);
    // Squarespace can replace post markup during navigation.
    document.addEventListener("mercury:load", build);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
