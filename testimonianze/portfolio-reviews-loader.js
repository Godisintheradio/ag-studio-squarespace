/* AG Studio — Portfolio reviews v1.0 | scoped reuse of testimonial component */
(function () {
  "use strict";
  const current = document.currentScript;
  if (!current || !current.parentNode) return;
  const sourceUrl = "https://www.google.com/search?q=Antonio+Giardiello+Consulente+Aziendale+recensioni";
  const reviews = [
    { name: "Pellegrino C.", text: "Un partner del quale certamente non ne faremo più a meno.", detail: "KERAPHO · Progetto web e collaborazione continuativa" },
    { name: "Studio Rosiello", text: "Strabiliante. Oltre l’aspettativa, mi ha davvero sorpreso nella creazione del brand. Complimenti.", detail: "Creazione del brand" },
    { name: "Annamaria P.", text: "La professionalità, la precisione e l'accuratezza per il lavoro sono le caratteristiche prevalenti dell'attività di Antonio Giardiello.", detail: "Rinnovamento dell'immagine aziendale" }
  ];
  const host = document.createElement("section");
  host.className = "ag-reviews";
  host.setAttribute("aria-label", "Recensioni dei progetti in portfolio");
  const uid = "ag-reviews-" + Math.random().toString(36).slice(2, 9);
  host.innerHTML = `
    <div class="ag-reviews__top"><span>DIETRO OGNI PROGETTO, UNA COLLABORAZIONE</span><span>RECENSIONI GOOGLE</span></div>
    <div class="ag-reviews__mark" aria-hidden="true">“</div>
    <div class="ag-reviews__quote" aria-live="polite" aria-atomic="true">
      <blockquote id="${uid}-quote"></blockquote>
    </div>
    <div class="ag-reviews__foot">
      <div class="ag-reviews__byline"><span class="ag-reviews__avatar" aria-hidden="true">✳</span>
        <div><strong id="${uid}-name"></strong><small id="${uid}-detail"></small></div>
      </div>
      <div class="ag-reviews__controls">
        <button type="button" class="ag-reviews__button" data-dir="-1" aria-label="Recensione precedente">←</button>
        <span class="ag-reviews__counter" aria-live="off"></span>
        <button type="button" class="ag-reviews__button" data-dir="1" aria-label="Recensione successiva">→</button>
      </div>
    </div>
    <a class="ag-reviews__source" href="${sourceUrl}" target="_blank" rel="noopener noreferrer">Consulta le recensioni su Google ↗</a>
  `;
  const style = document.createElement("style");
  style.textContent = `
    .ag-reviews{--agr-bg:#F5F3EE;--agr-text:#25342E;--agr-soft:#344D44;--agr-muted:#647168;--agr-line:#D4D9D1;--agr-avatar:#DCE6D0;background:var(--agr-bg);color:var(--agr-text);border-radius:22px;padding:clamp(24px,4vw,44px);box-sizing:border-box;font-family:inherit;width:100%}
    .ag-reviews *{box-sizing:border-box}
    .ag-reviews__top{display:flex;justify-content:space-between;align-items:center;gap:15px;flex-wrap:wrap;font-family:'DM Mono',monospace;font-size:11px;font-weight:600;letter-spacing:.055em;color:var(--agr-soft)}
    .ag-reviews__top span:last-child{font-size:10px;opacity:.8}
    .ag-reviews__mark{font-family:Georgia,serif;font-weight:700;font-size:78px;line-height:1;color:var(--agr-soft);height:77px;margin-top:22px}
    .ag-reviews__quote{display:flex;align-items:center;min-height:135px}
    .ag-reviews__quote blockquote{padding:0;border:0;margin:0;font-family:Manrope,Inter,sans-serif;font-size:clamp(23px,2.8vw,35px);font-weight:650;font-style:italic;line-height:1.45;letter-spacing:-.035em;color:var(--agr-text)}
    .ag-reviews__foot{border-top:1px solid var(--agr-line);display:flex;justify-content:space-between;align-items:center;gap:20px;padding-top:24px;margin-top:26px}
    .ag-reviews__byline{display:flex;align-items:center;gap:15px;min-width:0}
    .ag-reviews__avatar{display:grid;place-items:center;border-radius:50%;width:50px;height:50px;flex:none;background:var(--agr-avatar);color:var(--agr-soft);font-size:23px}
    .ag-reviews__byline strong{display:block;font-family:Manrope,Inter,sans-serif;font-size:15px;color:var(--agr-text)}
    .ag-reviews__byline small{display:block;margin-top:3px;font-family:Inter,sans-serif;font-size:12px;line-height:1.45;color:var(--agr-muted)}
    .ag-reviews__controls{display:flex;align-items:center;gap:8px;flex:none}
    .ag-reviews__button{appearance:none;width:40px;height:40px;display:grid;place-items:center;border-radius:50%;border:1px solid var(--agr-line);background:transparent;color:var(--agr-text);font-size:20px;cursor:pointer;line-height:1;transition:background .2s,transform .2s}
    .ag-reviews__button:hover{background:var(--agr-avatar);transform:translateY(-2px)}
    .ag-reviews__button:focus-visible,.ag-reviews__source:focus-visible{outline:3px solid #E0A66B;outline-offset:3px}
    .ag-reviews__counter{font-family:'DM Mono',monospace;color:var(--agr-muted);font-size:11px;min-width:38px;text-align:center}
    .ag-reviews__source{display:inline-block;margin-top:23px;color:var(--agr-soft);font:600 12px Inter,sans-serif;text-decoration:underline;text-underline-offset:3px}
    .ag-reviews.ag-reviews--dark{--agr-bg:#14191B;--agr-text:#F5F3EE;--agr-soft:#E0A66B;--agr-muted:#BCC6C1;--agr-line:#394340;--agr-avatar:#273430}
    @media(max-width:600px){.ag-reviews__top{align-items:flex-start}.ag-reviews__top span:last-child{font-size:9px}.ag-reviews__mark{font-size:64px;height:62px;margin-top:18px}.ag-reviews__quote{min-height:155px}.ag-reviews__foot{flex-wrap:wrap}.ag-reviews__controls{margin-left:auto}}
    @media(prefers-reduced-motion:reduce){.ag-reviews__button{transition:none}}
  `;
  current.parentNode.insertBefore(style, current);
  current.parentNode.insertBefore(host, current);
  let index = 0;
  const quote = host.querySelector("#" + uid + "-quote");
  const name = host.querySelector("#" + uid + "-name");
  const detail = host.querySelector("#" + uid + "-detail");
  const counter = host.querySelector(".ag-reviews__counter");
  function render() {
    const r = reviews[index];
    quote.textContent = "“" + r.text + "”";
    name.textContent = r.name;
    detail.textContent = r.detail;
    counter.textContent = (index + 1) + " / " + reviews.length;
  }
  host.addEventListener("click", function (e) {
    const button = e.target.closest("button[data-dir]");
    if (!button) return;
    index = (index + Number(button.dataset.dir) + reviews.length) % reviews.length;
    render();
  });
  /* Explicit dark mode opt-in: add ag-reviews--dark to host when the site toggles. */
  render();
})();