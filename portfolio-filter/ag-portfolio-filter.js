/* AG Portfolio Filter v1.0 — supports Squarespace 7.1 Grid Basic. */
(() => {
  "use strict";
  const config = window.AGPortfolioFilterConfig;
  if (!config || !Array.isArray(config.categories) || !config.projects) return;
  const normalize = path => path.replace(/\/+$/, "") || "/";
  if (normalize(location.pathname) !== normalize(config.pathname || "/portfolio")) return;

  function slugFromHref(href) {
    try {
      const url = new URL(href, location.href);
      if (url.origin !== location.origin) return null;
      const prefix = normalize(config.pathname || "/portfolio") + "/";
      const path = decodeURIComponent(url.pathname);
      if (!path.startsWith(prefix)) return null;
      const remainder = path.slice(prefix.length).replace(/\/+$/, "");
      return remainder && !remainder.includes("/") ? remainder.toLowerCase() : null;
    } catch (_) { return null; }
  }

  let grid = null, bar = null, empty = null, active = "all";
  const entries = new Map();

  function collect() {
    if (!grid) return;
    const current = new Set();
    grid.querySelectorAll("a.grid-item[href]").forEach(element => {
      current.add(element);
      const slug = slugFromHref(element.getAttribute("href"));
      const tags = slug && Array.isArray(config.projects[slug]) ? config.projects[slug] : [];
      entries.set(element, tags);
    });
    for (const element of entries.keys()) if (!current.has(element)) entries.delete(element);
  }

  function apply() {
    collect();
    let visible = 0;
    entries.forEach((tags, element) => {
      const show = active === "all" || tags.includes(active);
      element.classList.toggle("agpf-hidden", !show);
      if (show) visible++;
    });
    if (empty) empty.hidden = visible > 0;
    if (bar) bar.querySelectorAll("button[data-agpf-category]").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.agpfCategory === active));
    });
  }

  function init() {
    if (bar) return;
    grid = document.querySelector(config.gridSelector || "#gridThumbs.portfolio-grid-basic");
    if (!grid || !grid.querySelector("a.grid-item[href]")) return;
    bar = document.createElement("div");
    bar.className = "agpf";
    bar.setAttribute("role", "group");
    bar.setAttribute("aria-label", config.labels?.group || "Filtra i progetti");
    for (const category of config.categories) {
      if (!category.id || !category.label) continue;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "agpf__button";
      button.dataset.agpfCategory = category.id;
      button.textContent = category.label;
      button.addEventListener("click", () => { active = category.id; apply(); });
      bar.append(button);
    }
    if (!bar.children.length) { bar = null; return; }
    empty = document.createElement("p");
    empty.className = "agpf-empty";
    empty.textContent = config.labels?.empty || "Nessun progetto in questa categoria.";
    empty.hidden = true;
    grid.before(bar, empty);
    apply();

    // Observe child-list changes only: filtering classes never retrigger the observer.
    const observer = new MutationObserver(() => apply());
    observer.observe(grid, { childList: true, subtree: false });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else init();
  if (!bar) window.addEventListener("load", init, { once: true });
})();
