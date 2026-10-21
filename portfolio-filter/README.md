# AG Portfolio Filter v1.0 (development)
A configurable filter for Squarespace 7.1 native Portfolio Grid Basic collections. This branch is for testing and is not a released commercial product.

## Install on AG Studio
Place in page header injection (or site header injection; code only activates on the configured pathname), in this order:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Godisintheradio/ag-studio-squarespace@feature/ag-portfolio-filter-v1/portfolio-filter/ag-portfolio-filter.css">
<script src="https://cdn.jsdelivr.net/gh/Godisintheradio/ag-studio-squarespace@feature/ag-portfolio-filter-v1/portfolio-filter/ag-portfolio-config.js"></script>
<script defer src="https://cdn.jsdelivr.net/gh/Godisintheradio/ag-studio-squarespace@feature/ag-portfolio-filter-v1/portfolio-filter/ag-portfolio-filter.js"></script>
```

**For deployment, use a pinned commit SHA after verification rather than a moving branch.** For now, testing in Squarespace preview is recommended.

## Manage projects
Edit `ag-portfolio-config.js`: keys are the last segment of each native project URL; values are category-ID arrays. Example: `"kerapho": ["squarespace"]`. Projects without an assignment remain visible in **Tutti** only. Multiple categories are supported.

## Design and SEO
No changes to native image markup, project titles, metadata, links or original URLs. Uses scoped selectors and honors `html[data-ag-theme="dark"]`. If JS is disabled, all native projects remain visible. This is a client-side visibility filter, not a server-rendered category archive.

## Limitations
Tested by inspection against the AG Studio saved HTML Grid Basic markup; browser/live Squarespace testing still required. Other native portfolio layouts need additional adapters. MutationObserver handles direct grid child additions or removals.
