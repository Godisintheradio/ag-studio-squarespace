# AG Portfolio Filter v2 — visual setup pilot
This version preserves Squarespace 7.1 Portfolio Grid Basic and uses a browser-based configuration assistant.

## AG Studio installation
Replace the complete v1 snippet with:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Godisintheradio/ag-studio-squarespace@ag-portfolio-filter-v2/portfolio-filter/ag-portfolio-filter.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Godisintheradio/ag-studio-squarespace@ag-portfolio-filter-v2/portfolio-filter/ag-portfolio-setup.css">
<script src="https://cdn.jsdelivr.net/gh/Godisintheradio/ag-studio-squarespace@ag-portfolio-filter-v2/portfolio-filter/ag-portfolio-config.js"></script>
<script defer src="https://cdn.jsdelivr.net/gh/Godisintheradio/ag-studio-squarespace@ag-portfolio-filter-v2/portfolio-filter/ag-portfolio-filter.js"></script>
<script defer src="https://cdn.jsdelivr.net/gh/Godisintheradio/ag-studio-squarespace@ag-portfolio-filter-v2/portfolio-filter/ag-portfolio-setup.js"></script>
```

## Visual setup
Open `/portfolio?agpf-setup=1` on the same site in a normal browser window. The assistant reads the currently rendered Squarespace project grid and presents categorized checkboxes. Add categories, tick project assignments, click **Genera snippet**, then **Copia snippet**. Replace the original five-tag snippet in Squarespace Page Header Code Injection with the generated code. Refresh the public `/portfolio` without the query parameter. Changes are not persisted until the generated code is applied. Close the dialog to dismiss it.

## Notes
- This is a **pilot**, not a released commercial product. A logged-in Squarespace administrator is still needed to change Code Injection.
- The editor is not a private dashboard: anyone knowing the query flag can open it, but it does not modify site settings or publish code.
- Client-side filter; original native links, titles, thumbnails, and metadata are preserved.
- Projects with no category are visible only in **Tutti**.
- Grid Basic only; other portfolio templates and dynamic collection variants require adapters.
- Test on desktop/mobile, light/dark, and Squarespace editor before merging to main or selling.
- For commercial release, pin a stable tag/commit instead of mutable branch URLs.
