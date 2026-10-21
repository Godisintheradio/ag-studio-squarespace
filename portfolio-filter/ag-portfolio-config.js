/* AG Studio example configuration — no changes to Squarespace project titles. */
window.AGPortfolioFilterConfig = {
  pathname: "/portfolio",
  gridSelector: "#gridThumbs.portfolio-grid-basic",
  categories: [
    { id: "all", label: "Tutti" },
    { id: "squarespace", label: "Squarespace" },
    { id: "branding", label: "Identità visiva" }
  ],
  projects: {
    "kerapho": ["squarespace"],
    "polyglotz-language-school": ["branding"],
    "cerinat": ["branding"]
  },
  unassigned: "all",
  labels: { group: "Filtra i progetti", empty: "Nessun progetto in questa categoria." }
};
