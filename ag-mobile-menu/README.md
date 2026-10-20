# AG Mobile Menu 7.1 — beta 0.1.0

Prototipo per antoniogiardiello.it, basato sull'HTML esportato della homepage. Non ancora verificato sul sito live.

## Installazione

In Squarespace 7.1 > Impostazioni > Avanzate > Code Injection > Header, aggiungere:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Godisintheradio/ag-studio-squarespace@main/ag-mobile-menu/ag-mobile-menu.css">
<script defer src="https://cdn.jsdelivr.net/gh/Godisintheradio/ag-studio-squarespace@main/ag-mobile-menu/ag-mobile-menu.js"></script>
```

Verificare su smartphone e tablet: hamburger, categorie, navigazione, Contatti, Accedi, chiusura, scroll e breakpoint.

Per disattivarlo, eliminare o commentare i due tag inseriti.

## Scelte

- Usa la navigazione mobile Squarespace esistente come sorgente, senza fetch.
- Gestisce dinamicamente cartelle e normali link alla successiva apertura.
- Non modifica il menu desktop.
- Il carrello Squarespace rimane nell'header originale, non viene duplicato nel drawer.
- Se non rileva la navigazione sorgente, non intercetta l'hamburger e rimane attivo il menu nativo.
- Palette chiara e caratteri Inter/Manrope coerenti con i dati dell'header esportato; colori e dettagli modificabili tramite variabili CSS di `#agmm`.

## Limiti beta

- La funzione Accedi viene inoltrata al componente nativo Squarespace e va testata live.
- In caso di cambiamenti nel DOM Squarespace, i selettori andranno aggiornati.
- Test di accessibilità e comportamento mobile reale ancora da eseguire.
