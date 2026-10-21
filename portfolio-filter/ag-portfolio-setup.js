/* AG Portfolio Filter — in-page visual setup. Changes are local until snippet is copied. */
(() => {
  "use strict";
  if (new URLSearchParams(location.search).get("agpf-setup") !== "1") return;
  const cfg = window.AGPortfolioFilterConfig;
  if (!cfg || !location.pathname.replace(/\/+$/, "").endsWith("/portfolio")) return;
  const grid = document.querySelector(cfg.gridSelector || "#gridThumbs.portfolio-grid-basic");
  if (!grid) return;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const slug = url => {
    try { let u = new URL(url, location.href); if (u.origin !== location.origin) return null;
      const p = cfg.pathname.replace(/\/+$/, "") + "/";
      if (!u.pathname.startsWith(p)) return null;
      return decodeURIComponent(u.pathname.slice(p.length)).replace(/\/+$/, "").toLowerCase();
    } catch (_) { return null; }
  };
  const projects = [...grid.querySelectorAll("a.grid-item[href]")].map(a => {
    const s = slug(a.href); return s ? {slug:s, name:(a.querySelector(".portfolio-title")?.textContent || s).trim()} : null;
  }).filter(Boolean);
  const unique = [...new Map(projects.map(p => [p.slug,p])).values()];
  const state = {
    categories: cfg.categories.filter(c => c.id !== "all").map(c => ({...c})),
    projects: Object.fromEntries(unique.map(p => [p.slug, [...(cfg.projects[p.slug] || [])]]))
  };
  const panel = document.createElement("div");
  panel.className = "agpf-setup";
  panel.innerHTML = `<div class="agpf-setup__dialog" role="dialog" aria-modal="true" aria-label="Configurazione Portfolio Filter">
    <header><div><strong>AG Portfolio Filter</strong><small>Configuratore visuale · modifiche non ancora pubblicate</small></div>
    <button type="button" data-action="close" aria-label="Chiudi">×</button></header>
    <div class="agpf-setup__content">
    <h2>Categorie</h2><div data-section="categories"></div>
    <form data-action="add-category"><label for="agpf-new-category">Nuova categoria</label><div class="agpf-setup__inline"><input id="agpf-new-category" placeholder="Es. Web design" required><button type="submit">Aggiungi</button></div></form>
    <h2>Assegna i progetti</h2><p>Seleziona una o più categorie per ciascun progetto. I progetti non assegnati restano in Tutti.</p>
    <div data-section="projects"></div>
    <h2>Codice pronto da incollare</h2><p>Premi Genera, poi sostituisci il vecchio snippet nella Code Injection della pagina Portfolio.</p>
    <button type="button" data-action="generate">Genera snippet</button>
    <textarea data-section="output" rows="9" readonly aria-label="Snippet generato"></textarea>
    <button type="button" data-action="copy">Copia snippet</button><span data-section="status" role="status" aria-live="polite"></span>
    </div></div>`;
  document.body.append(panel);
  function idFromLabel(label) {
    return label.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  function render() {
    panel.querySelector('[data-section="categories"]').innerHTML = state.categories.map(c =>
      `<span class="agpf-setup__chip">${esc(c.label)} <button type="button" data-remove="${esc(c.id)}" aria-label="Rimuovi ${esc(c.label)}">×</button></span>`
    ).join("");
    panel.querySelector('[data-section="projects"]').innerHTML = unique.map(p =>
      `<fieldset><legend>${esc(p.name)}</legend><small>/portfolio/${esc(p.slug)}</small><div class="agpf-setup__checks">${state.categories.map(c =>
        `<label><input type="checkbox" data-project="${esc(p.slug)}" data-category="${esc(c.id)}" ${state.projects[p.slug].includes(c.id)?"checked":""}> ${esc(c.label)}</label>`
      ).join("")}</div></fieldset>`
    ).join("");
  }
  render();
  panel.addEventListener("change", e => {
    const a=e.target;
    if (a.matches("input[data-project]")) {
      const arr=state.projects[a.dataset.project];
      state.projects[a.dataset.project]=a.checked?[...new Set([...arr,a.dataset.category])]:arr.filter(x=>x!==a.dataset.category);
    }
  });
  panel.addEventListener("submit", e => {
    if (!e.target.matches('form[data-action="add-category"]')) return;
    e.preventDefault();
    const input = panel.querySelector("#agpf-new-category");
    const label=input.value.trim(), id=idFromLabel(label);
    if (!id || id==="all" || state.categories.some(c=>c.id===id)) return;
    state.categories.push({id,label});input.value="";render();
  });
  panel.addEventListener("click", async e => {
    const remove=e.target.closest("[data-remove]");
    if (remove) {
      const id=remove.dataset.remove;state.categories=state.categories.filter(c=>c.id!==id);
      Object.keys(state.projects).forEach(k=>state.projects[k]=state.projects[k].filter(c=>c!==id));
      render();return;
    }
    const action=e.target.closest("[data-action]")?.dataset.action;
    if (action==="close") { panel.remove(); history.replaceState(null,"",location.pathname); }
    if (action==="generate") {
      const config={ pathname:cfg.pathname, gridSelector:cfg.gridSelector, categories:[{id:"all",label:"Tutti"},...state.categories], projects:state.projects, labels:cfg.labels };
      const safe=JSON.stringify(config,null,2).replace(/</g,"\\u003c");
      const root="https://cdn.jsdelivr.net/gh/Godisintheradio/ag-studio-squarespace@ag-portfolio-filter-v2/portfolio-filter/";
      panel.querySelector('[data-section="output"]').value =
        '<!-- AG Portfolio Filter v2 -->\n<link rel="stylesheet" href="'+root+'ag-portfolio-filter.css">\n'+
        '<link rel="stylesheet" href="'+root+'ag-portfolio-setup.css">\n'+
        '<script>window.AGPortfolioFilterConfig = '+safe+';<\\/script>\n'.replace("<\\/script>","</script>")+
        '<script defer src="'+root+'ag-portfolio-filter.js"></script>\n'+
        '<script defer src="'+root+'ag-portfolio-setup.js"></script>';
      panel.querySelector('[data-section="status"]').textContent="Snippet generato. Copialo per applicare le modifiche.";
    }
    if (action==="copy") {
      const area=panel.querySelector('[data-section="output"]');
      if (!area.value) return;
      try{await navigator.clipboard.writeText(area.value);
        panel.querySelector('[data-section="status"]').textContent="Copiato negli appunti.";
      }catch(_){ area.select();panel.querySelector('[data-section="status"]').textContent="Selezionato: copia manualmente."; }
    }
  });
})();
